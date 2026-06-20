"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
  honeypot: z.string().max(0).optional(),
});

export async function submitContactForm(data: unknown) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  if (parsed.data.honeypot) {
    return { success: true }; // Spam, fake success
  }

  try {
    await prisma.propertyInquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
        leadType: "CONTACT",
        source: "contact_form",
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save message" };
  }
}

const inquirySchema = z.object({
  propertyId: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  honeypot: z.string().max(0).optional(),
});

export async function submitPropertyInquiry(data: unknown) {
  const parsed = inquirySchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  if (parsed.data.honeypot) {
    return { success: true };
  }

  try {
    await prisma.propertyInquiry.create({
      data: {
        propertyId: parsed.data.propertyId,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
        leadType: "INQUIRY",
        source: "property_inquiry",
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save inquiry" };
  }
}

const sellerLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().optional(),
  preferredLocation: z.string().optional(),
  transactionInterest: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

export async function submitSellerLead(data: unknown) {
  const parsed = sellerLeadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  if (parsed.data.honeypot) {
    return { success: true };
  }

  try {
    await prisma.propertyInquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
        preferredLocation: parsed.data.preferredLocation,
        transactionInterest: parsed.data.transactionInterest,
        leadType: "SELLER",
        source: "seller_form",
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save lead" };
  }
}

const buyerLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  propertyTypeInterest: z.string().optional(),
  budgetMin: z.number().optional(),
  budgetMax: z.number().optional(),
  preferredLocation: z.string().optional(),
  transactionInterest: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

export async function submitBuyerLead(data: unknown) {
  const parsed = buyerLeadSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  if (parsed.data.honeypot) {
    return { success: true };
  }

  try {
    await prisma.propertyInquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
        propertyTypeInterest: parsed.data.propertyTypeInterest,
        budgetMin: parsed.data.budgetMin,
        budgetMax: parsed.data.budgetMax,
        preferredLocation: parsed.data.preferredLocation,
        transactionInterest: parsed.data.transactionInterest,
        leadType: "BUYER",
        source: "buyer_form",
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save lead" };
  }
}
