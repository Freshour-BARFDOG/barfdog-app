import { useQuery } from "@tanstack/react-query";
import { getGeneralOrder } from "../checkout";
import {
  GeneralOrderSheetRequest,
  GeneralOrderSheetResponse,
  UseQueryCustomOptions,
} from "@/types";
import { queryKeys } from "@/constants";

export function useGetGeneralOrder(
  body: GeneralOrderSheetRequest,
  queryOptions?: UseQueryCustomOptions<GeneralOrderSheetResponse>
) {
  return useQuery({
    queryKey: [queryKeys.ORDER.BASE, queryKeys.ORDER.GET_GENERAL_ORDER, body],
    queryFn: () => getGeneralOrder(body),
    ...queryOptions,
  });
}
