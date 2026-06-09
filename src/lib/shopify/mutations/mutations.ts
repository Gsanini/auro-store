import { CART_FRAGMENT } from "../queries/queries";

const CART_MUTATION_RESULT = `
  cart {
    ...CartFields
  }
  userErrors {
    field
    message
    code
  }
  warnings {
    code
    message
    target
  }
`;

export const CART_CREATE_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      ${CART_MUTATION_RESULT}
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      ${CART_MUTATION_RESULT}
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      ${CART_MUTATION_RESULT}
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      ${CART_MUTATION_RESULT}
    }
  }
`;

export const CART_BUYER_IDENTITY_UPDATE_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
  ) {
    cartBuyerIdentityUpdate(
      cartId: $cartId
      buyerIdentity: $buyerIdentity
    ) {
      ${CART_MUTATION_RESULT}
    }
  }
`;

export const CART_DISCOUNT_CODES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      ${CART_MUTATION_RESULT}
    }
  }
`;
