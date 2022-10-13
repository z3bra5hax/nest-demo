import { Test, TestingModule } from '@nestjs/testing';
import { BioSignalConversionService } from './biosignal-conversion.service';
import { BiologicalMeasurementUnit, MeasurementEventData, ProcessedSignal, RawSignal, RawSignalTypeName, SignalConversionData, VitalMeasurement } from './data';
import { BIOSIGNAL_TEST_DATA, BIOSIGNAL_RANDOM_DATASET } from './test';

describe('BioSignalConversionService', () => {
  let service: BioSignalConversionService;
  let signalsSet: Record<RawSignalTypeName, RawSignal> = BIOSIGNAL_TEST_DATA;
  let randomSignalsSet: RawSignal[] = BIOSIGNAL_RANDOM_DATASET
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BioSignalConversionService],
    }).compile();

    service = module.get<BioSignalConversionService>(BioSignalConversionService);

  });

  const conversionHelper = (signal: RawSignal): {result: MeasurementEventData, processRecord: ProcessedSignal} => {
    const conversionData: SignalConversionData = service.convertSignal(signal);
    const { convertedData: result, signalProcessedData: processRecord } = conversionData;
    return { result, processRecord }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should accurately calculate heart rate from a six second EKG strip', () => {
    const { result } = conversionHelper(signalsSet.ekg_RR_Rate);
    expect(result.value).toBe(49);
  });

  it('should accurately calculate mean arterial pressure from a systolic blood pressure reading', () => {
    const { result } = conversionHelper(signalsSet.artertial_transducer_read);
    expect(result.value).toBe(76);
  });

  it('should not change ETCO2 signal reading values', () => {
    const { result } = conversionHelper(signalsSet.end_tidal_CO2_mmhg);
    expect(result.value).toBe(45.0);
  });

  it('should accurately convert signal timestamp to ISO string', () => {
    const { result } = conversionHelper(signalsSet.ekg_RR_Rate);
    expect(result.originTime).toBe('2022-11-19T18:45:19.211Z');
  });

  it('handles random data consistently', () => {
    randomSignalsSet.forEach( (signal: RawSignal) => {
      const { result,  processRecord } = conversionHelper(signal);
      const { type, measurementUnit } = result;
      expect(result).toEqual(expect.objectContaining({
        type: expect.any(String),
        value: expect.any(Number),
        measurementUnit: expect.any(String),
        originTime: expect.any(String)
      }));
      expect(Object.values(VitalMeasurement)).toContain(type);
      expect(Object.values(BiologicalMeasurementUnit)).toContain(measurementUnit);
    })
  })

});