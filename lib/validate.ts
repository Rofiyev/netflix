"use client";

import * as z from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(3).max(30),
  pin: z.string().min(4).max(4),
});

export const loginAccountSchema = z.object({
  pin: z.string().min(4).max(4),
});
