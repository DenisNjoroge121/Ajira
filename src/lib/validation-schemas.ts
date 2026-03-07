import { z } from "zod";

/**
 * Registration form validation schema
 * Ensures data integrity and security at client-side
 */
export const registrationSchema = z.object({
  first_name: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  
  last_name: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must not exceed 254 characters")
    .refine(email => !email.includes(".."), "Email cannot contain consecutive dots"),
  
  phone: z.string()
    .min(10, "Phone must be at least 10 characters")
    .max(20, "Phone must not exceed 20 characters")
    .regex(/^\+?[0-9\s()-]+$/, "Phone must be a valid phone number"),
  
  reg_number: z.string()
    .min(5, "Registration number must be at least 5 characters")
    .max(20, "Registration number must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9/-]+$/, "Registration number can only contain letters, numbers, hyphens, and slashes"),
  
  year_of_study: z.enum(["First Year", "Second Year", "Third Year", "Fourth Year", "Postgraduate"])
    .or(z.string().min(1, "Please select year of study")),
  
  course: z.string()
    .min(3, "Course must be at least 3 characters")
    .max(100, "Course must not exceed 100 characters"),
  
  school: z.string()
    .min(3, "School must be at least 3 characters")
    .max(100, "School must not exceed 100 characters"),
  
  career_interests: z.string()
    .max(500, "Career interests must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

/**
 * Admin authentication validation schema
 * Ensures password meets security requirements
 */
export const adminAuthSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must not exceed 254 characters"),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character"),
});

export type AdminAuthFormData = z.infer<typeof adminAuthSchema>;

/**
 * Newsletter subscription validation schema
 */
export const newsletterSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must not exceed 254 characters"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
