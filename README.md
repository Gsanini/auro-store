# Auro Store

Loja headless com Next.js e Shopify Storefront API.

## Variáveis de ambiente

```env
SHOPIFY_STORE_DOMAIN=sua-loja.myshopify.com
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=shpat_...
SHOPIFY_STOREFRONT_API_VERSION=2026-04
SHOPIFY_DEFAULT_COUNTRY=BR
SHOPIFY_WEBHOOK_SECRET=...
```

O `SHOPIFY_WEBHOOK_SECRET` deve ser o segredo usado pela Shopify para assinar
as entregas de webhook. Nunca exponha essas variáveis com o prefixo
`NEXT_PUBLIC_`.

## Webhooks

Configure os webhooks da Shopify para:

```text
https://seu-dominio.com/api/shopify/webhooks
```

Tópicos recomendados:

- Products: create, update e delete
- Collections: create, update e delete
- Inventory levels: update
- Inventory items: update
- Markets: create, update e delete

O endpoint valida `X-Shopify-Hmac-SHA256` sobre o corpo bruto antes de
invalidar o cache do catálogo.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
