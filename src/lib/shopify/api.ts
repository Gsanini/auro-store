import "server-only";

import { SHOPIFY_CATALOG_TAG, SHOPIFY_LOCALIZATION_TAG } from "./cache-tags";
import { shopifyFetch } from "./client";
import {
  CART_BUYER_IDENTITY_UPDATE_MUTATION,
  CART_CREATE_MUTATION,
  CART_DISCOUNT_CODES_UPDATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
} from "./mutations/mutations";
import {
  CART_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  COLLECTIONS_QUERY,
  LOCALIZATION_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "./queries/queries";
import type {
  Cart,
  CartBuyerIdentityInput,
  CartLineInput,
  CartLineUpdateInput,
  CartMutationResult,
  CartUserError,
  CartWarning,
  Collection,
  CollectionSummary,
  Connection,
  GetCollectionsOptions,
  GetCollectionOptions,
  GetProductsOptions,
  Localization,
  Product,
  ProductSummary,
} from "./types";

const CATALOG_REVALIDATE_SECONDS = 60;

type CartMutationPayload = {
  cart: Cart | null;
  userErrors: CartUserError[];
  warnings: CartWarning[];
};

function normalizePageSize(first = 20) {
  return Math.min(Math.max(Math.trunc(first), 1), 100);
}

function unwrapCartMutation(operation: string, payload: CartMutationPayload) {
  if (payload.userErrors.length) {
    const details = payload.userErrors
      .map((error) => `${error.code ?? "ERROR"}: ${error.message}`)
      .join("; ");

    throw new Error(`Shopify ${operation}: ${details}`);
  }

  if (!payload.cart) {
    throw new Error(`Shopify ${operation}: nenhum carrinho foi retornado.`);
  }

  return {
    cart: payload.cart,
    warnings: payload.warnings,
  };
}

export async function getProducts({
  first,
  after,
  country,
  query,
  sortKey,
  reverse,
}: GetProductsOptions = {}): Promise<Connection<ProductSummary>> {
  const data = await shopifyFetch<{
    products: Connection<ProductSummary>;
  }>({
    query: PRODUCTS_QUERY,
    variables: {
      first: normalizePageSize(first),
      after,
      country,
      query,
      sortKey,
      reverse,
    },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [SHOPIFY_CATALOG_TAG],
  });

  return data.products;
}

export async function getProductByHandle(
  handle: string,
  country?: string,
): Promise<Product | null> {
  const data = await shopifyFetch<{ product: Product | null }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle, country },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [SHOPIFY_CATALOG_TAG],
  });

  return data.product;
}

export async function getCollections({
  first,
  after,
  country,
  query,
  sortKey,
  reverse,
}: GetCollectionsOptions = {}): Promise<Connection<CollectionSummary>> {
  const data = await shopifyFetch<{
    collections: Connection<CollectionSummary>;
  }>({
    query: COLLECTIONS_QUERY,
    variables: {
      first: normalizePageSize(first),
      after,
      country,
      query,
      sortKey,
      reverse,
    },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [SHOPIFY_CATALOG_TAG],
  });

  return data.collections;
}

export async function getCollectionByHandle(
  handle: string,
  { first, after, country }: GetCollectionOptions = {},
): Promise<Collection | null> {
  const data = await shopifyFetch<{ collection: Collection | null }>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: {
      handle,
      first: normalizePageSize(first),
      after,
      country,
    },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [SHOPIFY_CATALOG_TAG],
  });

  return data.collection;
}

export async function createCart(
  lines: CartLineInput[] = [],
  buyerIp?: string,
  buyerIdentity?: CartBuyerIdentityInput,
): Promise<CartMutationResult> {
  const data = await shopifyFetch<{ cartCreate: CartMutationPayload }>({
    query: CART_CREATE_MUTATION,
    variables: { input: { lines, buyerIdentity } },
    buyerIp,
  });

  return unwrapCartMutation("cartCreate", data.cartCreate);
}

export async function getLocalization(country?: string): Promise<Localization> {
  const data = await shopifyFetch<{ localization: Localization }>({
    query: LOCALIZATION_QUERY,
    variables: { country },
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [SHOPIFY_LOCALIZATION_TAG],
  });

  return data.localization;
}

export async function getCart(
  cartId: string,
  buyerIp?: string,
): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: Cart | null }>({
    query: CART_QUERY,
    variables: { id: cartId },
    buyerIp,
  });

  return data.cart;
}

export async function addCartLines(
  cartId: string,
  lines: CartLineInput[],
  buyerIp?: string,
): Promise<CartMutationResult> {
  const data = await shopifyFetch<{ cartLinesAdd: CartMutationPayload }>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines },
    buyerIp,
  });

  return unwrapCartMutation("cartLinesAdd", data.cartLinesAdd);
}

export async function updateCartLines(
  cartId: string,
  lines: CartLineUpdateInput[],
  buyerIp?: string,
): Promise<CartMutationResult> {
  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationPayload }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines },
    buyerIp,
  });

  return unwrapCartMutation("cartLinesUpdate", data.cartLinesUpdate);
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[],
  buyerIp?: string,
): Promise<CartMutationResult> {
  const data = await shopifyFetch<{ cartLinesRemove: CartMutationPayload }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
    buyerIp,
  });

  return unwrapCartMutation("cartLinesRemove", data.cartLinesRemove);
}

export async function updateCartBuyerIdentity(
  cartId: string,
  buyerIdentity: CartBuyerIdentityInput,
  buyerIp?: string,
): Promise<CartMutationResult> {
  const data = await shopifyFetch<{
    cartBuyerIdentityUpdate: CartMutationPayload;
  }>({
    query: CART_BUYER_IDENTITY_UPDATE_MUTATION,
    variables: { cartId, buyerIdentity },
    buyerIp,
  });

  return unwrapCartMutation(
    "cartBuyerIdentityUpdate",
    data.cartBuyerIdentityUpdate,
  );
}

export async function updateCartDiscountCodes(
  cartId: string,
  discountCodes: string[],
  buyerIp?: string,
): Promise<CartMutationResult> {
  const data = await shopifyFetch<{
    cartDiscountCodesUpdate: CartMutationPayload;
  }>({
    query: CART_DISCOUNT_CODES_UPDATE_MUTATION,
    variables: { cartId, discountCodes },
    buyerIp,
  });

  return unwrapCartMutation(
    "cartDiscountCodesUpdate",
    data.cartDiscountCodesUpdate,
  );
}
