import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
  TError = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, unknown>, "mutationFn">;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
> & {
  keepPreviousData?: boolean;
};

type UseSuspenseQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
> = Omit<
  UseSuspenseQueryOptions<TQueryFnData, TypeError, TData, QueryKey>,
  "queryKey"
> & {
  keepPreviousData?: boolean;
};

type UseInfiniteQueryCustomOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, TError, TData, QueryKey>,
  "queryKey" | "queryFn"
>;

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
  detailMessage: string | null;
  errorCode: string | null;
}

export type {
  ApiResponse,
  UseInfiniteQueryCustomOptions,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
  UseSuspenseQueryCustomOptions,
};
