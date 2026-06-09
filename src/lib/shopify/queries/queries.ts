export const PRODUCT_SUMMARY_FRAGMENT = `
  fragment ProductSummary on Product {
    id
    title
    handle
    description
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        id
        title
        availableForSale
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    createdAt
    updatedAt
    buyerIdentity {
      countryCode
      email
      phone
    }
    discountCodes {
      code
      applicable
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            product {
              id
              title
              handle
              featuredImage {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
  }
`;

export const PRODUCTS_QUERY = `
  ${PRODUCT_SUMMARY_FRAGMENT}

  query Products(
    $first: Int!
    $after: String
    $query: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $country: CountryCode
  ) @inContext(country: $country) {
    products(
      first: $first
      after: $after
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
      nodes {
        ...ProductSummary
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!, $country: CountryCode)
  @inContext(country: $country) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      availableForSale
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 20) {
        nodes {
          url
          altText
          width
          height
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      options {
        id
        name
        values
      }
      seo {
        title
        description
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `
  query Collections(
    $first: Int!
    $after: String
    $query: String
    $sortKey: CollectionSortKeys
    $reverse: Boolean
    $country: CountryCode
  ) @inContext(country: $country) {
    collections(
      first: $first
      after: $after
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
          width
          height
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = `
  ${PRODUCT_SUMMARY_FRAGMENT}

  query CollectionByHandle(
    $handle: String!
    $first: Int!
    $after: String
    $country: CountryCode
  ) @inContext(country: $country) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        url
        altText
        width
        height
      }
      seo {
        title
        description
      }
      products(first: $first, after: $after) {
        nodes {
          ...ProductSummary
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const CART_QUERY = `
  ${CART_FRAGMENT}

  query Cart($id: ID!) {
    cart(id: $id) {
      ...CartFields
    }
  }
`;

export const LOCALIZATION_QUERY = `
  query Localization($country: CountryCode) @inContext(country: $country) {
    localization {
      country {
        isoCode
        name
        currency {
          isoCode
          name
          symbol
        }
        availableLanguages {
          isoCode
          name
          endonymName
        }
      }
      language {
        isoCode
        name
        endonymName
      }
      availableCountries {
        isoCode
        name
        currency {
          isoCode
          name
          symbol
        }
        availableLanguages {
          isoCode
          name
          endonymName
        }
      }
    }
  }
`;
