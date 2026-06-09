import Link from "next/link";
import { notFound } from "next/navigation";
import { formatMoney } from "../../../lib/format-money";
import { getCollectionByHandle } from "../../../lib/shopify";
import { getCurrentCountry } from "../../../lib/shopify/localization-session";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle, {
    first: 24,
    country: await getCurrentCountry(),
  });

  if (!collection) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/">Produtos</Link>
        <Link href="/collections">Coleções</Link>
        <Link href="/cart">Carrinho</Link>
      </nav>

      <h1 className="text-4xl font-semibold">{collection.title}</h1>
      <p className="mt-4">{collection.description}</p>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {collection.products.nodes.map((product) => (
          <Link key={product.id} href={`/products/${product.handle}`}>
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="aspect-[4/5] w-full object-cover"
              />
            )}
            <h2 className="mt-3 text-lg">{product.title}</h2>
            <p>{formatMoney(product.priceRange.minVariantPrice)}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
