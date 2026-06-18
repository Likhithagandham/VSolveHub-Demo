import { z } from "zod";

export const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number");

export const otpSendSchema = z.object({
  phone: phoneSchema,
});

export const otpVerifySchema = z.object({
  phone: phoneSchema,
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const dispatchBookingSchema = z.object({
  serviceId: z.string(),
  slot: z.string().min(1),
  address: z.string().min(5),
});

export const crewBookingSchema = z.object({
  serviceId: z.string(),
  slot: z.string().min(1),
  address: z.string().min(5),
  headcount: z.coerce.number().min(1).max(50),
  days: z.coerce.number().min(1).max(30),
});

export const enquiryBookingSchema = z.object({
  serviceId: z.string(),
  message: z.string().min(10).optional(),
});

export const addressSchema = z.object({
  label: z.string().min(1),
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  pincode: z.string().regex(/^\d{6}$/),
  isDefault: z.boolean().optional(),
});
