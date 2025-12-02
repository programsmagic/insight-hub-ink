"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details && Array.isArray(result.details)) {
          const fieldErrors: Record<string, string> = {};
          result.details.forEach((detail: { field: string; message: string }) => {
            fieldErrors[detail.field] = detail.message;
          });
          setErrors(fieldErrors);
          toast.error(result.error || "Please fix the errors in the form");
        } else {
          toast.error(result.error || "Failed to send message. Please try again.");
        }
        return;
      }

      toast.success(result.message || "Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input 
                  id="name" 
                  name="name"
                  required 
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email"
                  required 
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject <span className="text-destructive">*</span>
                </label>
                <Input 
                  id="subject" 
                  name="subject"
                  required 
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea 
                  id="message" 
                  name="message"
                  required 
                  className="min-h-[150px]"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={loading} aria-busy={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MailIcon className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@insighthub.ink</p>
                </div>
              </div>
              {process.env.NEXT_PUBLIC_CONTACT_PHONE && (
                <div className="flex items-start gap-4">
                  <PhoneIcon className="w-6 h-6 text-accent mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a 
                      href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE.replace(/\s/g, '')}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {process.env.NEXT_PUBLIC_CONTACT_PHONE}
                    </a>
                  </div>
                </div>
              )}
              {process.env.NEXT_PUBLIC_CONTACT_ADDRESS && (
                <div className="flex items-start gap-4">
                  <MapPinIcon className="w-6 h-6 text-accent mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <address className="text-muted-foreground not-italic">
                      {process.env.NEXT_PUBLIC_CONTACT_ADDRESS.split('\n').map((line, index, arr) => (
                        <span key={index}>
                          {line}
                          {index < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </address>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}