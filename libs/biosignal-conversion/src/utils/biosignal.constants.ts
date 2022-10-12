import { BiologicalMeasurementUnit, RawSignalType, VitalMeasurement } from "../data"

export const SIGNAL_VITAL_MAPPING: Record<RawSignalType, VitalMeasurement> = {
    [RawSignalType.PPGPulse]: VitalMeasurement.Pulse,
    [RawSignalType.EkgPulse]: VitalMeasurement.Pulse,
    [RawSignalType.IRO2Saturation]: VitalMeasurement.SpO2,
    [RawSignalType.IABP]: VitalMeasurement.MAP,
    [RawSignalType.NIBP]: VitalMeasurement.NIBP,
    [RawSignalType.ETCO2]: VitalMeasurement.ETCO2
}

export const SIGNAL_UNIT_MAPPING: Record<RawSignalType, BiologicalMeasurementUnit> = {
    [RawSignalType.PPGPulse]: BiologicalMeasurementUnit.BPM,
    [RawSignalType.EkgPulse]: BiologicalMeasurementUnit.BPM,
    [RawSignalType.IRO2Saturation]: BiologicalMeasurementUnit.Percent,
    [RawSignalType.IABP]: BiologicalMeasurementUnit.MMHG,
    [RawSignalType.NIBP]: BiologicalMeasurementUnit.MMHG,
    [RawSignalType.ETCO2]: BiologicalMeasurementUnit.MMHG
}