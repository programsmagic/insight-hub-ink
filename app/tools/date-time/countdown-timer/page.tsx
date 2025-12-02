"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function CountdownTimerPage() {
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || !targetDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsRunning(false);
        toast.success("Countdown finished!");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, targetDate]);

  const handleStart = () => {
    if (!targetDate) {
      toast.error("Please enter a target date");
      return;
    }

    const target = new Date(targetDate);
    if (isNaN(target.getTime())) {
      toast.error("Invalid date format");
      return;
    }

    if (target.getTime() <= new Date().getTime()) {
      toast.error("Target date must be in the future");
      return;
    }

    setIsRunning(true);
    toast.success("Countdown started!");
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleClear = () => {
    setTargetDate("");
    setTimeLeft(null);
    setIsRunning(false);
  };

  return (
    <ToolLayout
      title="Countdown Timer"
      description="Create countdown timers for events"
      category="Date/Time Tools"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target-date">Target Date and Time</Label>
            <Input
              id="target-date"
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              disabled={isRunning}
            />
          </div>

          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={handleStart} className="flex-1">
                Start Countdown
              </Button>
            ) : (
              <Button onClick={handleStop} variant="destructive" className="flex-1">
                Stop
              </Button>
            )}
            <Button onClick={handleClear} variant="outline" disabled={isRunning}>
              Clear
            </Button>
          </div>
        </div>

        {timeLeft && (
          <Card className="p-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm text-muted-foreground">Hours</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm text-muted-foreground">Seconds</div>
              </div>
            </div>
          </Card>
        )}

        <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <p className="font-semibold mb-2">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a target date and time</li>
            <li>Click "Start Countdown" to begin the timer</li>
            <li>The countdown updates every second</li>
            <li>Click "Stop" to pause the countdown</li>
            <li>Perfect for tracking events, deadlines, or special occasions</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}

