const PAYMENT_METHOD = {
  CREDIT_CARD: "card",
  KAKAO_PAY: "kakaopay",
  NAVER_PAY: "naverpay",
} as const;

const CHECKOUT_ROUTES = {
  GENERAL: {
    order: "/checkout/general/order",
    failed: "/checkout/general/failed",
    completed: (orderId: number) => `/checkout/general/completed/${orderId}`,
  },
  SUBSCRIPTION: {
    order: (subscribeId: number) =>
      `/checkout/subscription/order/${subscribeId}`,
    failed: (subscribeId: number) =>
      `/checkout/subscription/failed/${subscribeId}`,
    completed: (orderId: number) =>
      `/checkout/subscription/completed/${orderId}`,
  },
} as const;

export { CHECKOUT_ROUTES, PAYMENT_METHOD };
