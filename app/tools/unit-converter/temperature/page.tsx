"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertTemperature } from "@/lib/tools/unit-converter-utils";
import { toast } from "sonner";

const temperatureUnits = [
  { value: "celsius", label: "Celsius (°C)" },
  { value: "fahrenheit", label: "Fahrenheit (°F)" },
  { value: "kelvin", label: "Kelvin (K)" },
];

export default function TemperatureConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("celsius");
  const [toUnit, setToUnit] = useState("fahrenheit");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    if (!value.trim()) {
      toast.error("Please enter a value");
      return;
    }

    try {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        toast.error("Invalid number");
        return;
      }

      const converted = convertTemperature(numValue, fromUnit, toUnit);
      setResult(converted.toFixed(2));
      toast.success("Converted successfully!");
    } catch (err) {
      toast.error("Conversion failed");
    }
  };

  const handleClear = () => {
    setValue("");
    setResult("");
  };

  return (
    <ToolLayout
      title="Temperature Converter"
      description="Convert between Celsius, Fahrenheit, and Kelvin"
      category="Unit Converter Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value">Temperature</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter temperature"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-unit">From</Label>
              <select
                id="from-unit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {temperatureUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-unit">To</Label>
              <select
                id="to-unit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {temperatureUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1">
              Convert
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="result">Result</Label>
              <CopyButton text={result} />
            </div>
            <Input
              id="result"
              value={`${result} ${temperatureUnits.find((u) => u.value === toUnit)?.label.split("(")[1]?.replace(")", "") || toUnit}`}
              readOnly
              className="font-mono bg-muted"
            />
          </div>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a temperature value</li>
            <li>Select the source unit (Celsius, Fahrenheit, or Kelvin)</li>
            <li>Select the target unit</li>
            <li>Click "Convert" to see the result</li>
            <li>Accurate temperature conversions</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}





