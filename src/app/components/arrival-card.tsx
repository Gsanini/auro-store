import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "../../lib/format-money";
import type { ProductSummary } from "../../lib/shopify";

type ArrivalCardProps = {
  product: ProductSummary;
  badge?: string;
  variant?: "light" | "dark";
};

export default function ArrivalCard({
  product,
  badge,
  variant = "light",
}: ArrivalCardProps) {
  const image = product.featuredImage;
  const isDark = variant === "dark";

  return (
    <article className='group min-w-0'>
      <Link
        href={`/products/${product.handle}`}
        className={`block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 ${
          isDark
            ? "overflow-hidden bg-[#020706] pb-5 focus-visible:outline-white"
            : "focus-visible:outline-deepBluish"
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            isDark
              ? "aspect-[0.9] rounded-t-xl bg-[#020706]"
              : "aspect-square rounded-xl bg-[#f0efec]"
          }`}
        >
          {badge && (
            <span className='absolute top-3 left-3 z-10 rounded-full bg-lightCream px-2.5 py-1 text-[8px] leading-none font-medium tracking-[-0.02em] text-darkBack uppercase shadow-[0_2px_12px_rgba(4,24,20,0.05)] sm:top-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-[9px]'>
              {badge}
            </span>
          )}

          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              sizes='(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 42px), 375px'
              className={`object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
                isDark ? "p-[9%]" : "p-[12%]"
              }`}
            />
          ) : (
            <div
              className={`flex h-full items-center justify-center p-8 text-center text-xs tracking-[0.18em] uppercase ${
                isDark ? "text-white/35" : "text-darkBack/35"
              }`}
            >
              Imagem em breve
            </div>
          )}
        </div>

        <div
          className={`px-2 pt-4 text-center sm:pt-5 ${
            isDark ? "text-white" : "text-darkBack"
          }`}
        >
          <p
            className={`text-[9px] leading-none font-medium tracking-[0.14em] uppercase ${
              isDark ? "text-white/48" : "text-darkBack/48"
            }`}
          >
            Auro Watches
          </p>
          <h3 className='mt-2 truncate text-[13px] leading-tight font-medium tracking-[-0.02em] uppercase sm:text-[15px]'>
            {product.title}
          </h3>
          <p
            className={`mt-2 text-[11px] leading-none font-normal sm:text-xs ${
              isDark ? "text-white/62" : "text-darkBack/70"
            }`}
          >
            {formatMoney(product.priceRange.minVariantPrice)}
          </p>
        </div>
      </Link>
    </article>
  );
}
