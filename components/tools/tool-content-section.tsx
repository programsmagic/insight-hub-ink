"use client";

import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { HelpCircle, Lightbulb, Code, MessageSquare, Link2 } from "lucide-react";

interface ToolContentSectionProps {
  aboutText?: string;
  useCases?: string[];
  examples?: Array<{ input: string; output: string; description?: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  relatedTools?: Array<{ id: string; name: string; route: string }>;
}

export function ToolContentSection({
  aboutText,
  useCases,
  examples,
  faqs,
  relatedTools,
}: ToolContentSectionProps) {
  return (
    <div className="space-y-6 mt-8">
      {aboutText && (
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">About This Tool</h3>
              <p className="text-muted-foreground leading-relaxed">{aboutText}</p>
            </div>
          </div>
        </Card>
      )}

      {useCases && useCases.length > 0 && (
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">Use Cases</h3>
              <ul className="space-y-2">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-muted-foreground">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {examples && examples.length > 0 && (
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Code className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">Examples</h3>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    {example.description && (
                      <p className="text-sm text-muted-foreground">{example.description}</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold mb-1 text-muted-foreground">Input:</p>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm break-all">
                          {example.input}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-1 text-muted-foreground">Output:</p>
                        <div className="bg-muted p-3 rounded-md font-mono text-sm break-all">
                          {example.output}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {faqs && faqs.length > 0 && (
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Card>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Link2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3">Related Tools</h3>
              <div className="flex flex-wrap gap-2">
                {relatedTools.map((tool) => (
                  <Link key={tool.id} href={tool.route}>
                    <Badge variant="outline" className="hover:bg-accent/10 cursor-pointer">
                      {tool.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

