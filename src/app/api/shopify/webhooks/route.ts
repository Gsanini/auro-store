import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import {
  SHOPIFY_CATALOG_TAG,
  SHOPIFY_LOCALIZATION_TAG,
} from "../../../../lib/shopify/cache-tags";

export const runtime = "nodejs";

function verifyHmac(rawBody: string, providedHmac: string, secret: string) {
  const calculatedHmac = createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");
  const providedBuffer = Buffer.from(providedHmac, "utf8");
  const calculatedBuffer = Buffer.from(calculatedHmac, "utf8");

  return (
    providedBuffer.length === calculatedBuffer.length &&
    timingSafeEqual(providedBuffer, calculatedBuffer)
  );
}

function getTagsForTopic(topic: string) {
  if (
    topic.startsWith("products/") ||
    topic.startsWith("collections/") ||
    topic.startsWith("inventory_items/") ||
    topic.startsWith("inventory_levels/")
  ) {
    return [SHOPIFY_CATALOG_TAG];
  }

  if (topic.startsWith("markets/")) {
    return [SHOPIFY_CATALOG_TAG, SHOPIFY_LOCALIZATION_TAG];
  }

  return [];
}

export async function POST(request: Request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

  if (!secret) {
    return Response.json(
      { error: "SHOPIFY_WEBHOOK_SECRET não configurado." },
      { status: 503 },
    );
  }

  const hmac = request.headers.get("x-shopify-hmac-sha256");
  const topic = request.headers.get("x-shopify-topic");
  const shopDomain = request.headers.get("x-shopify-shop-domain");
  const webhookId = request.headers.get("x-shopify-webhook-id");
  const rawBody = await request.text();

  if (
    !hmac ||
    !topic ||
    shopDomain !== process.env.SHOPIFY_STORE_DOMAIN ||
    !verifyHmac(rawBody, hmac, secret)
  ) {
    return Response.json({ error: "Webhook inválido." }, { status: 401 });
  }

  const tags = getTagsForTopic(topic);

  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return Response.json({
    received: true,
    topic,
    webhookId,
    revalidatedTags: tags,
  });
}
