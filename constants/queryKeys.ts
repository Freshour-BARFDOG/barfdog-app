export { queryKeys };

const queryKeys = {
  AUTH: {
    BASE: "auth",
    GET_USER_INFO: "getUserInfo",
  },
  CHECKOUT: {
    BASE: "checkout",
    GET_SUBSCRIPTION_CHECKOUT: "getSubscriptionCheckout",
    GET_GENERAL_CHECKOUT: "getGeneralCheckout",
  },
  STORE: {
    BASE: "store",
  },
} as const;
