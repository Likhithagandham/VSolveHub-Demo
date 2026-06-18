import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "Enter a valid 10-digit phone number");

export const otpSendSchema = z.object({
  phone: phoneSchema,
});

export const otpVerifySchema = z.object({
  phone: phoneSchema,
  otp: z.string().trim().min(4, "OTP is required"),
});

export const addressSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(40),
  fullAddress: z.string().trim().min(10, "Enter a complete address").max(300),
  isDefault: z.boolean().optional(),
});

export const bookingSchema = z.object({
  serviceId: z.string().min(1, "Service is required"),
  addressId: z.string().min(1, "Address is required"),
  slot: z.string().min(1, "Time slot is required"),
});

export const savedServiceSchema = z.object({
  serviceId: z.string().min(1),
});
