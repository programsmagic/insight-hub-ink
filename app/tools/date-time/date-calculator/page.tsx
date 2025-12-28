"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { calculateDateDifference, addTimeToDate } from "@/lib/tools/date-utils";
import { toast } from "sonner";

export default function DateCalculatorPage() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [baseDate, setBaseDate] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<"days" | "hours" | "minutes" | "seconds">("days");
  const [mode, setMode] = useState<"difference" | "add">("difference");
  const [result, setResult] = useState<string>("");

  const calculateDifference = () => {
    if (!date1 || !date2) {
      toast.error("Please enter both dates");
      return;
    }

    try {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        toast.error("Invalid date format");
        return;
      }

      const diff = calculateDateDifference(d1, d2);
      setResult(
        `Difference: ${diff.days} days, ${diff.hours} hours, ${diff.minutes} minutes, ${diff.seconds} seconds`
      );
      toast.success("Calculated successfully!");
    } catch (err) {
      toast.error("Calculation failed");
    }
  };

  const calculateAdd = () => {
    if (!baseDate || !amount) {
      toast.error("Please enter date and amount");
      return;
    }

    try {
      const date = new Date(baseDate);
      if (isNaN(date.getTime())) {
        toast.error("Invalid date format");
        return;
      }

      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        toast.error("Invalid amount");
        return;
      }

      const resultDate = addTimeToDate(date, numAmount, unit);
      setResult(`Result: ${resultDate.toISOString()}`);
      toast.success("Calculated successfully!");
    } catch (err) {
      toast.error("Calculation failed");
    }
  };

  const handleClear = () => {
    setDate1("");
    setDate2("");
    setBaseDate("");
    setAmount("");
    setResult("");
  };

  return (
    <ToolLayout
      title="Date Calculator"
      description="Calculate date differences and add/subtract time"
      category="Date/Time Tools"
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button
            onClick={() => setMode("difference")}
            variant={mode === "difference" ? "default" : "outline"}
            size="sm"
          >
            Date Difference
          </Button>
          <Button
            onClick={() => setMode("add")}
            variant={mode === "add" ? "default" : "outline"}
            size="sm"
          >
            Add/Subtract Time
          </Button>
        </div>

        {mode === "difference" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date1">First Date</Label>
                <Input
                  id="date1"
                  type="datetime-local"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date2">Second Date</Label>
                <Input
                  id="date2"
                  type="datetime-local"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculateDifference} className="flex-1">
                Calculate Difference
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base-date">Base Date</Label>
              <Input
                id="base-date"
                type="datetime-local"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter number (negative to subtract)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <select
                  id="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as typeof unit)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="days">Days</option>
                  <option value="hours">Hours</option>
                  <option value="minutes">Minutes</option>
                  <option value="seconds">Seconds</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculateAdd} className="flex-1">
                Calculate
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            </div>
          </div>
        )}

        {result && (
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Result</p>
              <CopyButton text={result} />
            </div>
            <p className="mt-2">{result}</p>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Date Difference:</strong> Calculate the difference between two dates</li>
            <li><strong>Add/Subtract Time:</strong> Add or subtract time from a date</li>
            <li>Use negative values to subtract time</li>
            <li>Results are shown in ISO format</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}











