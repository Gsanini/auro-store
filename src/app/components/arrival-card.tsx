import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "../../lib/format-money";
import type { ProductSummary } from "../../lib/shopify";

type ArrivalCardProps = {
  product: ProductSummary;
  badge?: string;
};

export default function ArrivalCard({ product, badge }: ArrivalCardProps) {
  const image = product.featuredImage;

  return (
    <article className="group min-w-0">
      <Link
        href={`/products/${product.handle}`}
        className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-deepBluish"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f0efec]">
          {badge && (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-lightCream px-2.5 py-1 text-[8px] leading-none font-medium tracking-[-0.02em] text-darkBack uppercase shadow-[0_2px_12px_rgba(4,24,20,0.05)] sm:top-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-[9px]">
              {badge}
            </span>
          )}

          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 42px), 375px"
              className="object-contain p-[12%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-xs tracking-[0.18em] text-darkBack/35 uppercase">
              Imagem em breve
            </div>
          )}
        </div>

        <div className="px-1 pt-4 text-center text-darkBack sm:pt-5">
          <p className="text-[9px] leading-none font-medium tracking-[0.14em] text-darkBack/48 uppercase">
            Auro Watches
          </p>
          <h3 className="mt-2 truncate text-[13px] leading-tight font-medium tracking-[-0.02em] uppercase sm:text-sm">
            {product.title}
          </h3>
          <p className="mt-2 text-[11px] leading-none font-normal text-darkBack/70 sm:text-xs">
            {formatMoney(product.priceRange.minVariantPrice)}
          </p>
        </div>
      </Link>
    </article>
  );
}
