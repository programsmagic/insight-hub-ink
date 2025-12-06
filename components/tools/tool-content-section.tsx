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
        <Card className="p-6 sm:p-8 border-accent/10 shadow-elevation-md hover:shadow-elevation-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
              <HelpCircle className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-3 text-foreground">About This Tool</h3>
              <p className="text-muted-foreground leading-relaxed text-base">{aboutText}</p>
            </div>
          </div>
        </Card>
      )}

      {useCases && useCases.length > 0 && (
        <Card className="p-6 sm:p-8 border-accent/10 shadow-elevation-md hover:shadow-elevation-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-4 text-foreground">Use Cases</h3>
              <ul className="space-y-3">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <span className="text-accent mt-1.5 text-lg font-bold group-hover:scale-110 transition-transform">•</span>
                    <span className="text-muted-foreground text-base leading-relaxed group-hover:text-foreground transition-colors">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {examples && examples.length > 0 && (
        <Card className="p-6 sm:p-8 border-accent/10 shadow-elevation-md hover:shadow-elevation-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
              <Code className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-4 text-foreground">Examples</h3>
              <div className="space-y-6">
                {examples.map((example, index) => (
                  <div key={index} className="space-y-3">
                    {example.description && (
                      <p className="text-sm font-medium text-foreground/80">{example.description}</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Input:</p>
                        <div className="bg-muted/50 border-2 border-input/30 p-4 rounded-md font-mono text-sm break-all hover:border-accent/30 transition-colors">
                          {example.input}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Output:</p>
                        <div className="bg-accent/5 border-2 border-accent/20 p-4 rounded-md font-mono text-sm break-all">
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
        <Card className="p-6 sm:p-8 border-accent/10 shadow-elevation-md hover:shadow-elevation-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-4 text-foreground">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="border-border/50">
                    <AccordionTrigger className="text-left hover:text-accent transition-colors font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
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
        <Card className="p-6 sm:p-8 border-accent/10 shadow-elevation-md hover:shadow-elevation-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
              <Link2 className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-4 text-foreground">Related Tools</h3>
              <div className="flex flex-wrap gap-3">
                {relatedTools.map((tool) => (
                  <Link key={tool.id} href={tool.route}>
                    <Badge 
                      variant="outline" 
                      className="hover:bg-accent/10 hover:text-accent hover:border-accent/30 cursor-pointer transition-all duration-200 text-sm px-4 py-2"
                    >
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


