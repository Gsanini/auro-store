"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addCartLines,
  createCart,
  getLocalization,
  removeCartLines,
  updateCartBuyerIdentity,
  updateCartDiscountCodes,
  updateCartLines,
} from "../lib/shopify";
import {
  getBuyerIp,
  getCurrentCart,
  saveCartId,
} from "../lib/shopify/cart-session";
import type { CartWarning } from "../lib/shopify";
import {
  getCurrentCountry,
  saveCurrentCountry,
} from "../lib/shopify/localization-session";

function getRequiredString(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== "string" || !value) {
    throw new Error(`Campo obrigatório inválido: ${name}`);
  }

  return value;
}

function getQuantity(formData: FormData) {
  const quantity = Number(getRequiredString(formData, "quantity"));

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
    throw new Error("A quantidade deve ser um número inteiro entre 1 e 999.");
  }

  return quantity;
}

function validateShopifyId(id: string, resource: "ProductVariant" | "CartLine") {
  if (!id.startsWith(`gid://shopify/${resource}/`)) {
    throw new Error(`ID Shopify inválido para ${resource}.`);
  }
}

function throwIfCartWarnings(warnings: CartWarning[]) {
  if (warnings.length) {
    throw new Error(warnings.map((warning) => warning.message).join("; "));
  }
}

export async function createCartAction() {
  const result = await createCart(
    [],
    await getBuyerIp(),
    { countryCode: await getCurrentCountry() },
  );
  await saveCartId(result.cart.id);
  revalidatePath("/cart");
  throwIfCartWarnings(result.warnings);
}

export async function addToCartAction(formData: FormData) {
  const merchandiseId = getRequiredString(formData, "merchandiseId");
  const quantity = getQuantity(formData);
  validateShopifyId(merchandiseId, "ProductVariant");

  const buyerIp = await getBuyerIp();
  const buyerIdentity = { countryCode: await getCurrentCountry() };
  const currentCart = await getCurrentCart();
  const result = currentCart
    ? await addCartLines(
        currentCart.id,
        [{ merchandiseId, quantity }],
        buyerIp,
    )
    : await createCart([{ merchandiseId, quantity }], buyerIp, buyerIdentity);

  await saveCartId(result.cart.id);
  revalidatePath("/cart");
  throwIfCartWarnings(result.warnings);
}

export async function updateCartLineAction(formData: FormData) {
  const lineId = getRequiredString(formData, "lineId");
  const quantity = getQuantity(formData);
  validateShopifyId(lineId, "CartLine");

  const cart = await getCurrentCart();

  if (!cart) {
    throw new Error("Carrinho não encontrado.");
  }

  const result = await updateCartLines(
    cart.id,
    [{ id: lineId, quantity }],
    await getBuyerIp(),
  );
  revalidatePath("/cart");
  throwIfCartWarnings(result.warnings);
}

export async function removeCartLineAction(formData: FormData) {
  const lineId = getRequiredString(formData, "lineId");
  validateShopifyId(lineId, "CartLine");

  const cart = await getCurrentCart();

  if (!cart) {
    throw new Error("Carrinho não encontrado.");
  }

  const result = await removeCartLines(cart.id, [lineId], await getBuyerIp());
  revalidatePath("/cart");
  throwIfCartWarnings(result.warnings);
}

export async function applyDiscountCodeAction(formData: FormData) {
  const code = getRequiredString(formData, "discountCode").trim();
  const cart = await getCurrentCart();

  if (!cart) {
    throw new Error("Carrinho não encontrado.");
  }

  const discountCodes = [
    ...cart.discountCodes
      .map((discount) => discount.code)
      .filter((current) => current.toLowerCase() !== code.toLowerCase()),
    code,
  ];

  await updateCartDiscountCodes(cart.id, discountCodes, await getBuyerIp());
  revalidatePath("/cart");
}

export async function removeDiscountCodeAction(formData: FormData) {
  const code = getRequiredString(formData, "discountCode");
  const cart = await getCurrentCart();

  if (!cart) {
    throw new Error("Carrinho não encontrado.");
  }

  const discountCodes = cart.discountCodes
    .map((discount) => discount.code)
    .filter((current) => current.toLowerCase() !== code.toLowerCase());

  await updateCartDiscountCodes(cart.id, discountCodes, await getBuyerIp());
  revalidatePath("/cart");
}

export async function setCountryAction(formData: FormData) {
  const country = getRequiredString(formData, "country").toUpperCase();
  const localization = await getLocalization();

  if (
    !localization.availableCountries.some(
      (availableCountry) => availableCountry.isoCode === country,
    )
  ) {
    throw new Error("Este país não está disponível nos Markets da loja.");
  }

  await saveCurrentCountry(country);

  const cart = await getCurrentCart();

  if (cart) {
    const result = await updateCartBuyerIdentity(
      cart.id,
      { countryCode: country },
      await getBuyerIp(),
    );
    throwIfCartWarnings(result.warnings);
  }

  revalidatePath("/", "layout");
}

export async function checkoutAction() {
  const cart = await getCurrentCart();

  if (!cart) {
    throw new Error("Carrinho não encontrado.");
  }

  const checkoutUrl = new URL(cart.checkoutUrl);
  checkoutUrl.searchParams.set("channel", "headless-storefronts");

  redirect(checkoutUrl.toString());
}
