import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants";
import { QueryClient } from "@tanstack/react-query";
import { getSubscriptionCheckout } from "../checkout";
import { SubscriptionCheckoutResponse } from "@/types";

export async function prefetchGetSubscriptionCheckout(
  queryClient: QueryClient,
  subscribeId: number
) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery<SubscriptionCheckoutResponse>({
    queryKey: [
      queryKeys.CHECKOUT.BASE,
      queryKeys.CHECKOUT.GET_SUBSCRIPTION_CHECKOUT_SHEET,
      subscribeId,
    ],
    queryFn: () => getSubscriptionCheckout(subscribeId, ssrAxios),
  });
}
