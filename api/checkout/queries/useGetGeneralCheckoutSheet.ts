import { useQuery } from "@tanstack/react-query";
import { getGeneralCheckoutSheet } from "../checkout";
import {
  GeneralOrderSheetRequest,
  GeneralOrderSheetResponse,
  UseQueryCustomOptions,
} from "@/types";
import { queryKeys } from "@/constants";

export function useGetGeneralCheckoutSheet(
  body: GeneralOrderSheetRequest,
  queryOptions?: UseQueryCustomOptions<GeneralOrderSheetResponse>
) {
  return useQuery({
    queryKey: [
      queryKeys.CHECKOUT.BASE,
      queryKeys.CHECKOUT.GET_GENERAL_CHECKOUT_SHEET,
      body,
    ],
    queryFn: () => getGeneralCheckoutSheet(body),
    ...queryOptions,
  });
}
