import { z } from "zod";

export const BlogUpsertSchema = z.object({
  title: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  content: z.string().min(1),
  meta_title: z.string().min(3),
  meta_description: z.string().min(50).max(160),
  featured_image: z.string().url().nullable().optional(),
  tags: z.array(z.string().min(1)).default([]),
  published: z.boolean().default(false),
  category: z.string().min(1).nullable().optional(),
});

export const ProductUpsertSchema = z.object({
  name: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  description: z.string().min(1),
  category: z.string().min(1),
  status: z.enum(["active", "beta", "coming_soon"]).default("active"),
  logo_url: z.string().url().nullable().optional(),
  icon: z.string().min(1).optional(),
  featured: z.boolean().default(false),
  featured_order: z.number().int().default(0),
  page_content: z.record(z.string(), z.unknown()).optional(),
});

export const SiteContentUpsertSchema = z.object({
  value: z.record(z.string(), z.unknown()),
});

/** Public contact form — `website` is a honeypot; must be empty. */
export const ContactFormSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(10).max(8000),
  website: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

