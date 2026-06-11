import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import type { ProductSummary } from "../../lib/shopify";
import ArrivalCard from "./arrival-card";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const badges = ["50% off", "New arrival", "50% off", "New arrival"];

type PerfectWatchesProps = {
  products: ProductSummary[];
};

export default function PerfectWatches({ products }: PerfectWatchesProps) {
  const featuredProducts = products.slice(0, 4);

  if (!featuredProducts.length) {
    return null;
  }

  return (
    <section
      aria-labelledby='perfect-watches-title'
      className='bg-offWhite px-5 py-18 sm:px-8 sm:py-24 lg:px-12 lg:py-22'
    >
      <div className='mx-auto max-w-295'>
        <div className='flex items-center justify-between gap-6'>
          <h2
            id='perfect-watches-title'
            className={`${displayFont.className} text-[clamp(38px,5vw,68px)] leading-none font-normal tracking-[-0.04em] text-darkBack`}
          >
            Find Your Perfect Watch
          </h2>

          <Link
            href='/collections'
            className='hidden min-h-11.5 mt-3 min-w-30 shrink-0 items-center justify-center rounded-full border border-darkBack bg-darkBack px-6.25 py-3.25 text-[11px] font-bold tracking-tight text-white shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-[background-color,color,transform] duration-220 hover:bg-white hover:text-darkBack focus-visible:-translate-y-0.5 focus-visible:bg-white focus-visible:text-darkBack focus-visible:outline-none sm:inline-flex min-[561px]:min-h-13 min-[561px]:min-w-35 min-[561px]:text-[13px]'
          >
            View All Products
          </Link>
        </div>

        <div className='mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4 lg:gap-4'>
          {featuredProducts.map((product, index) => (
            <ArrivalCard
              key={product.id}
              product={product}
              badge={badges[index]}
              variant='dark'
            />
          ))}
        </div>

        <Link
          href='/collections'
          className='mt-7 inline-flex min-h-11.5 min-w-39.5 items-center justify-center rounded-full border border-darkBack bg-darkBack px-6.25 py-3.25 text-[11px] font-bold tracking-tight text-white shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-[background-color,color,transform] duration-220 hover:bg-white hover:text-darkBack focus-visible:-translate-y-0.5 focus-visible:bg-white focus-visible:text-darkBack focus-visible:outline-none sm:hidden'
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
