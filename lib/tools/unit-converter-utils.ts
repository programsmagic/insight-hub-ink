/**
 * Unit converter utility functions
 */

// Length conversions
export function convertLength(value: number, from: string, to: string): number {
  const toMeters: Record<string, number> = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34,
  };

  const meters = value * (toMeters[from.toLowerCase()] || 1);
  return meters / (toMeters[to.toLowerCase()] || 1);
}

// Weight conversions
export function convertWeight(value: number, from: string, to: string): number {
  const toKilograms: Record<string, number> = {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000,
  };

  const kilograms = value * (toKilograms[from.toLowerCase()] || 1);
  return kilograms / (toKilograms[to.toLowerCase()] || 1);
}

// Temperature conversions
export function convertTemperature(value: number, from: string, to: string): number {
  if (from.toLowerCase() === to.toLowerCase()) return value;

  // Convert to Celsius first
  let celsius = value;
  if (from.toLowerCase() === "fahrenheit") {
    celsius = (value - 32) * (5 / 9);
  } else if (from.toLowerCase() === "kelvin") {
    celsius = value - 273.15;
  }

  // Convert from Celsius to target
  if (to.toLowerCase() === "fahrenheit") {
    return celsius * (9 / 5) + 32;
  } else if (to.toLowerCase() === "kelvin") {
    return celsius + 273.15;
  }

  return celsius;
}

// Volume conversions
export function convertVolume(value: number, from: string, to: string): number {
  const toLiters: Record<string, number> = {
    liter: 1,
    milliliter: 0.001,
    gallon: 3.78541,
    quart: 0.946353,
    pint: 0.473176,
    cup: 0.236588,
    fluidounce: 0.0295735,
  };

  const liters = value * (toLiters[from.toLowerCase()] || 1);
  return liters / (toLiters[to.toLowerCase()] || 1);
}

// Speed conversions
export function convertSpeed(value: number, from: string, to: string): number {
  const toMetersPerSecond: Record<string, number> = {
    "m/s": 1,
    "km/h": 0.277778,
    "mph": 0.44704,
    "ft/s": 0.3048,
    knot: 0.514444,
  };

  const mps = value * (toMetersPerSecond[from.toLowerCase()] || 1);
  return mps / (toMetersPerSecond[to.toLowerCase()] || 1);
}


