/**
 * Input validation and sanitization utilities
 */

import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string().email('Invalid email address').min(1, 'Email is required');

// Phone validation schema (basic international format)
export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format');

// Name validation schema
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters');

// Text input sanitization
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// HTML sanitization (basic)
export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Consultation form validation schema
export const consultationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().max(200).optional(),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  timezone: z.string().optional(),
  serviceInterest: z.string().min(1, 'Service interest is required'),
  currentPlatforms: z.string().optional(),
  goals: z.string().min(10, 'Goals must be at least 10 characters'),
  budget: z.string().optional(),
});

// Contact form validation schema
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters'),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;

