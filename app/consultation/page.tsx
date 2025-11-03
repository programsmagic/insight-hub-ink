"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ConsultationPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to platform after 2 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://smm.insighthub.ink";
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="p-12">
          <h1 className="text-3xl font-bold mb-4">Redirecting to Platform...</h1>
          <p className="text-lg text-muted-foreground mb-8">
            You're being redirected to our SMM platform where you can view all plans, services, and get started.
          </p>
          <Button size="lg" asChild>
            <Link href="https://smm.insighthub.ink" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Go to Platform Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            If you're not redirected automatically, click the button above.
          </p>
        </Card>
      </div>
    </div>
  );
}
