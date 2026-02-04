import { queryKeys } from "@/constants";
import {
  GetGeneralCheckoutRequest,
  GetGeneralCheckoutResponse,
  UseQueryCustomOptions,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getGeneralCheckout } from "../checkout";

export function useGetGeneralCheckout(
  body: GetGeneralCheckoutRequest,
  queryOptions?: UseQueryCustomOptions<GetGeneralCheckoutResponse>,
) {
  return useQuery({
    queryKey: [
      queryKeys.CHECKOUT.BASE,
      queryKeys.CHECKOUT.GET_GENERAL_CHECKOUT,
      body,
    ],
    enabled: body.itemList.length > 0,
    queryFn: () => getGeneralCheckout(body),
    ...queryOptions,
  });
}
