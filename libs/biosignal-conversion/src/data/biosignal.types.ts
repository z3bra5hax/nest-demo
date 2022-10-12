export enum BiologicalMeasurementUnit {
    MMHG = 'mmHg',
    Mv = 'mV',
    BPM = 'bpm',
    Percent = '%',
    Strip = '6000ms_reading',
}

export enum VitalMeasurement {
    Pulse = "pulse",
    NIBP = "blood_pressure",
    SpO2 = "SpO2",
    ETCO2 = "ETCO2",
    MAP = "mean_arterial_pressure",
}

export enum RawSignalType {
    PPGPulse = "photoplethysmogram_pulse",
    IRO2Saturation = "ir_sat_percentatge",
    IABP = "artertial_transducer_read",
    EkgPulse = "ekg_RR_Rate",
    NIBP = "nibp_mmhg",
    ETCO2 = "end_tidal_CO2_mmhg"
}

export interface BaseSignalData {
    value: number,
    unit: BiologicalMeasurementUnit
}

export interface RawSignal {
    type: RawSignalType;
    value: number;
    deviceId: string;
    artifactFlag?: boolean;
    timeStamp: EpochTimeStamp;
}

export interface ProcessedSignal {
    id?: string;
    type: VitalMeasurement;
    value: number;
    unit: BiologicalMeasurementUnit;
    originTime: EpochTimeStamp;
    signalSource: RawSignalType;
    deviceId: string;
    artifactFlag?: boolean;
    rawSignal: RawSignal;
}

export interface MeasurementEvent {
    type: VitalMeasurement;
    value: number;
    measurementUnit: BiologicalMeasurementUnit;
    originTime: ISODateTimeString;
}

export interface MeasurementEventRecord extends MeasurementEvent {
    id?: string;
    processedSignalId?: string;
    patientId?: string;
}

export interface SignalConversionData {
    convertedData: MeasurementEvent;
    signalProcessedData: ProcessedSignal;
}

export type UnitConverter = (value: number, unit: BiologicalMeasurementUnit) => BaseSignalData;
export type ISODateTimeString = string;

export abstract class SignalConversionService {
    abstract convertSignal(incomingSignal: RawSignal): SignalConversionData;
}