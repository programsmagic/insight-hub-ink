"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { calculateAge } from "@/lib/tools/date-utils";
import { toast } from "sonner";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    if (!birthDate) {
      toast.error("Please enter a birth date");
      return;
    }

    try {
      const date = new Date(birthDate);
      if (isNaN(date.getTime())) {
        toast.error("Invalid date format");
        return;
      }

      const age = calculateAge(date);
      setResult(
        `Age: ${age.years} years, ${age.months} months, ${age.days} days`
      );
      toast.success("Calculated successfully!");
    } catch (err) {
      toast.error("Calculation failed");
    }
  };

  const handleClear = () => {
    setBirthDate("");
    setResult("");
  };

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate age from birth date"
      category="Date/Time Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birth-date">Birth Date</Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1">
              Calculate Age
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
        </div>

        {result && (
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Age</p>
              <CopyButton text={result} />
            </div>
            <p className="mt-2">{result}</p>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter your birth date</li>
            <li>Click "Calculate Age" to see your age</li>
            <li>Age is shown in years, months, and days</li>
            <li>Calculated from today's date</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

