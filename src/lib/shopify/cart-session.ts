import "server-only";

import { cookies, headers } from "next/headers";
import { getCart } from "./api";
import type { Cart } from "./types";

const CART_COOKIE = "auro_cart_id";
const CART_MAX_AGE_SECONDS = 60 * 60 * 24 * 10;

export async function getBuyerIp() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for");

  return (
    headerStore.get("cf-connecting-ip") ??
    forwardedFor?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    undefined
  );
}

export async function getCartId() {
  return (await cookies()).get(CART_COOKIE)?.value;
}

export async function getCurrentCart(): Promise<Cart | null> {
  const cartId = await getCartId();

  if (!cartId) {
    return null;
  }

  return getCart(cartId, await getBuyerIp());
}

export async function saveCartId(cartId: string) {
  (await cookies()).set(CART_COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CART_MAX_AGE_SECONDS,
  });
}
