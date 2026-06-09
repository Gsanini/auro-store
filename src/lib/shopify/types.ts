export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type Connection<T> = {
  nodes: T[];
  pageInfo: PageInfo;
};

export type PriceRange = {
  minVariantPrice: Money;
  maxVariantPrice: Money;
};

export type ProductVariantSummary = {
  id: string;
  title: string;
  availableForSale: boolean;
};

export type ProductSummary = {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  priceRange: PriceRange;
  variants: Connection<ProductVariantSummary>;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = ProductVariantSummary & {
  selectedOptions: SelectedOption[];
  image: ShopifyImage | null;
  price: Money;
  compareAtPrice: Money | null;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Seo = {
  title: string | null;
  description: string | null;
};

export type Product = Omit<ProductSummary, "variants"> & {
  descriptionHtml: string;
  images: Connection<ShopifyImage>;
  options: ProductOption[];
  seo: Seo;
  variants: Connection<ProductVariant>;
};

export type CollectionSummary = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
};

export type Collection = CollectionSummary & {
  descriptionHtml: string;
  seo: Seo;
  products: Connection<ProductSummary>;
};

export type CountryCode = string;

export type Currency = {
  isoCode: string;
  name: string;
  symbol: string;
};

export type Language = {
  isoCode: string;
  name: string;
  endonymName: string;
};

export type Country = {
  isoCode: CountryCode;
  name: string;
  currency: Currency;
  availableLanguages: Language[];
};

export type Localization = {
  country: Country;
  language: Language;
  availableCountries: Country[];
};

export type CartBuyerIdentity = {
  countryCode: CountryCode | null;
  email: string | null;
  phone: string | null;
};

export type CartBuyerIdentityInput = {
  countryCode?: CountryCode;
  email?: string;
  phone?: string;
  customerAccessToken?: string;
};

export type CartDiscountCode = {
  code: string;
  applicable: boolean;
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: ProductVariant & {
    product: Pick<ProductSummary, "id" | "title" | "handle" | "featuredImage">;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
  buyerIdentity: CartBuyerIdentity;
  discountCodes: CartDiscountCode[];
  lines: Connection<CartLine>;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
};

export type CartUserError = {
  field: string[] | null;
  message: string;
  code: string | null;
};

export type CartWarning = {
  code: string;
  message: string;
  target: string | null;
};

export type CartMutationResult = {
  cart: Cart;
  warnings: CartWarning[];
};

export type AttributeInput = {
  key: string;
  value: string;
};

export type CartLineInput = {
  merchandiseId: string;
  quantity?: number;
  sellingPlanId?: string;
  attributes?: AttributeInput[];
};

export type CartLineUpdateInput = {
  id: string;
  merchandiseId?: string;
  quantity?: number;
  sellingPlanId?: string;
  attributes?: AttributeInput[];
};

export type ProductSortKey =
  | "BEST_SELLING"
  | "CREATED_AT"
  | "ID"
  | "PRICE"
  | "PRODUCT_TYPE"
  | "RELEVANCE"
  | "TITLE"
  | "UPDATED_AT"
  | "VENDOR";

export type CollectionSortKey =
  | "ID"
  | "RELEVANCE"
  | "TITLE"
  | "UPDATED_AT";

export type PaginationOptions = {
  first?: number;
  after?: string;
};

export type GetProductsOptions = PaginationOptions & {
  country?: CountryCode;
  query?: string;
  sortKey?: ProductSortKey;
  reverse?: boolean;
};

export type GetCollectionsOptions = PaginationOptions & {
  country?: CountryCode;
  query?: string;
  sortKey?: CollectionSortKey;
  reverse?: boolean;
};

export type GetCollectionOptions = PaginationOptions & {
  country?: CountryCode;
};
