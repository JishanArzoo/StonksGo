import { z } from "zod";

export const placeOrderSchema = z.object({
  symbol: z
    .string()
    .trim()
    .min(1)
    .max(10)
    .transform((value) => value.toUpperCase()),

  side: z.enum(["buy", "sell"]),

  type: z.enum(["market", "limit", "stop", "stop_limit"]),

  qty: z.string().optional(),

  timeInForce: z.string().min(1),

  limitPrice: z.string().optional(),

  stopPrice: z.string().optional(),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;
