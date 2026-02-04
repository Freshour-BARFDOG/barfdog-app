import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import {
  SubscriptionCheckoutResponse,
  UseSuspenseQueryCustomOptions,
} from "@/types";
import { getSubscriptionCheckout } from "../checkout";

export function useGetSubscriptionCheckout(
  subscribeId: number,
  queryOptions?: UseSuspenseQueryCustomOptions<SubscriptionCheckoutResponse>
) {
  return useSuspenseQuery({
    queryFn: () => getSubscriptionCheckout(subscribeId),
    queryKey: [
      queryKeys.CHECKOUT.BASE,
      queryKeys.CHECKOUT.GET_SUBSCRIPTION_CHECKOUT_SHEET,
      subscribeId,
    ],
    ...queryOptions,
  });
}
