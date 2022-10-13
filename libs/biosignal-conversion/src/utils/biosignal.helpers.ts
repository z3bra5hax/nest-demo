import { BiologicalMeasurementUnit, UnitConverter } from '../data';

export namespace BioSignalHelpers {
    export const dynamicUnitConversion = (converter: (value: number) => number): UnitConverter => (value: number, unit: BiologicalMeasurementUnit) => ({ value: converter(value), unit });
    export const RRToPulse = (sixSecondRate: number): number => Math.round(sixSecondRate * 10);
    export const bpToMap = (systolicPressure: number, diastolicPressure: number = 76): number => Math.round((systolicPressure + (2 * diastolicPressure)) / 3);
}