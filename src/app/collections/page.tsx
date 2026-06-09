import Link from "next/link";
import { getCollections } from "../../lib/shopify";
import { getCurrentCountry } from "../../lib/shopify/localization-session";

export default async function CollectionsPage() {
  const collections = await getCollections({
    first: 24,
    country: await getCurrentCountry(),
  });

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-8">
      <nav className="mb-8 flex gap-4">
        <Link href="/">Produtos</Link>
        <Link href="/cart">Carrinho</Link>
      </nav>

      <h1 className="text-4xl font-semibold">Coleções</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {collections.nodes.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
          >
            {collection.image && (
              <img
                src={collection.image.url}
                alt={collection.image.altText || collection.title}
                className="aspect-square w-full object-cover"
              />
            )}
            <h2 className="mt-3 text-xl">{collection.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
