import { Injectable } from '@nestjs/common';
import { BaseSignalData, BiologicalMeasurementUnit, ProcessedSignal, RawSignal, RawSignalType, RawSignalTypeName, SignalConversionData, SignalConversionService, UnitConverter, VitalMeasurement } from './data';
import { BioSignalHelpers as Helpers, SIGNAL_UNIT_MAPPING, SIGNAL_VITAL_MAPPING } from './utils'

@Injectable()
export class BioSignalConversionService extends SignalConversionService {

    private static getBaseDataConversion(value: number, signal: RawSignalTypeName): BaseSignalData {
        const simpleUnitConversion: UnitConverter = (__,___) => ({ value, unit });
        const unit: BiologicalMeasurementUnit = SIGNAL_UNIT_MAPPING[signal];
        const conversionTable: Record<RawSignalType, UnitConverter> = {
            [RawSignalType.ETCO2]: simpleUnitConversion,
            [RawSignalType.IRO2Saturation]: simpleUnitConversion,
            [RawSignalType.PPGPulse]: simpleUnitConversion,
            [RawSignalType.EkgPulse]: Helpers.dynamicUnitConversion(Helpers.RRToPulse),
            [RawSignalType.IABP]: Helpers.dynamicUnitConversion(Helpers.bpToMap),
            [RawSignalType.NIBP]: Helpers.dynamicUnitConversion(Helpers.bpToMap),
        }
        return conversionTable[signal](value, unit);
    }

    protected processSignal(rawSignal: RawSignal): ProcessedSignal {
        const { type: signalSource, value: rawValue, timeStamp: originTime, deviceId, artifactFlag } = rawSignal;
        const {unit, value}: BaseSignalData = BioSignalConversionService.getBaseDataConversion(rawValue, signalSource);
        const type: VitalMeasurement = SIGNAL_VITAL_MAPPING[signalSource];
        return ({
            type,
            unit,
            value,
            signalSource,
            originTime,
            deviceId,
            artifactFlag,
            rawSignal
        });
    }

    public convertSignal(incomingSignal: RawSignal): SignalConversionData {
        const signalProcessedData: ProcessedSignal = this.processSignal(incomingSignal);
        const { type, value, originTime: timeStamp, unit: measurementUnit } = signalProcessedData;
        const originTime = new Date(timeStamp).toISOString();
        return ({
            convertedData: {
                type,
                value,
                originTime,
                measurementUnit
            },
            signalProcessedData
        });
    }

};
