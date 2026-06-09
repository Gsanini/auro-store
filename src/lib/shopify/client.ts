import "server-only";

type ShopifyGraphQLError = {
  message?: string;
  extensions?: {
    code?: string;
  };
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: ShopifyGraphQLError[];
};

type ShopifyFetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
  buyerIp?: string;
  revalidate?: number;
  tags?: string[];
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }

  return value;
}

const domain = getRequiredEnv("SHOPIFY_STORE_DOMAIN");
const token = getRequiredEnv("SHOPIFY_STOREFRONT_PRIVATE_TOKEN");
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-04";

export async function shopifyFetch<T>({
  query,
  variables,
  buyerIp,
  revalidate,
  tags,
}: ShopifyFetchOptions): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Shopify-Storefront-Private-Token": token,
  };

  if (buyerIp) {
    headers["Shopify-Storefront-Buyer-IP"] = buyerIp;
  }

  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    ...(revalidate === undefined
      ? { cache: "no-store" as const }
      : { next: { revalidate, tags } }),
  });

  const requestId = res.headers.get("x-request-id");
  const responseText = await res.text();
  let json: ShopifyResponse<T>;

  try {
    json = JSON.parse(responseText) as ShopifyResponse<T>;
  } catch {
    throw new Error(
      `Resposta inválida da Storefront API (${res.status} ${res.statusText})`,
    );
  }

  if (!res.ok || json.errors?.length) {
    const details = json.errors
      ?.map((error) => error.message || error.extensions?.code)
      .filter(Boolean)
      .join("; ");
    const authenticationHint =
      res.status === 401 || res.status === 403
        ? ` Verifique se o token privado da Storefront API está ativo e pertence à loja ${domain}.`
        : "";
    const requestIdDetail = requestId ? `; request-id: ${requestId}` : "";

    throw new Error(
      `Falha na Storefront API (${res.status} ${res.statusText}${requestIdDetail}): ${details || "erro desconhecido"}.${authenticationHint}`,
    );
  }

  if (!json.data) {
    throw new Error("A Storefront API não retornou dados.");
  }

  return json.data;
}
