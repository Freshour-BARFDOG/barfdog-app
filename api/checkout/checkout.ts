import {
  GetGeneralCheckoutRequest,
  GetGeneralCheckoutResponse,
  PrepareGeneralPaymentRequest,
  PreparePaymentResponse,
  PrepareSubscriptionPaymentRequest,
  SubscriptionCheckoutResponse,
  SuccessGeneralPaymentRequest,
  SuccessSubscriptionPaymentRequest,
} from "@/types";
import { validateApiResponse } from "@/utils/auth/apiResponseUtils";
import { AxiosInstance } from "axios";
import { axiosInstance } from "../axiosInstance";

// 구독 결제 페이지 조회
const getSubscriptionCheckout = async (
  subscribeId: number,
  instance: AxiosInstance = axiosInstance,
): Promise<SubscriptionCheckoutResponse> => {
  const { data } = await instance.get(
    `/api/v2/user/subscribes/${subscribeId}/order-estimate`,
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 정보를 불러오지 못했습니다";
  throw new Error(message);
};

// 구독 결제 준비: 결제 1단계
const prepareSubscriptionPayment = async (
  body: PrepareSubscriptionPaymentRequest,
): Promise<PreparePaymentResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/user/subscribe-orders/payment/prepare",
    body,
  );
  return validateApiResponse(data, "구독 결제 준비에 실패 했습니다");
};

// 주문 결제 검증: 요청 결제 금액과 실 결제 금액 비교
const validateSubscriptionPayment = async ({
  orderId,
  impUid,
  customerUid,
}: {
  orderId: number;
  impUid: string;
  customerUid: string;
}): Promise<boolean> => {
  try {
    const { data } = await axiosInstance.post(
      `/api/v2/user/subscribe-orders/${orderId}/payment/consistency`,
      {
        impUid,
        customerUid,
      },
    );

    return data.success;
  } catch (error) {
    console.error("결제 검증 API 요청 실패:", error);
    return false;
  }
};

// 정상 결제 요청: 최종 결제 완료
const successSubscriptionPayment = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: SuccessSubscriptionPaymentRequest;
}) => {
  const { data } = await axiosInstance.put(
    `/api/v2/user/subscribe-orders/${orderId}/payment/success`,
    body,
  );
  return validateApiResponse(data, "결제 성공 처리에 실패 했습니다");
};

// 구독 결제 실패
const failSubscriptionPayment = async (orderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/v2/user/subscribe-orders/${orderId}/payment/fail`,
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 실패 처리에 실패했습니다";
  throw new Error(message);
};

// 구독 결제 취소
const cancelSubscriptionPayment = async (orderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/v2/user/subscribe-orders/${orderId}/payment/cancel`,
  );
  return validateApiResponse(data, "결제 취소 처리에 실패 했습니다");
};

// 일반 결제 주문 정보 조회
const getGeneralCheckout = async (
  body: GetGeneralCheckoutRequest,
): Promise<GetGeneralCheckoutResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/user/general-orders/payment/estimate",
    body,
  );
  return validateApiResponse(data, "일반 주문 페이지 조회에 실패 했습니다");
};

// 일반 결제 준비 - 결제 1단계
const prepareGeneralPayment = async (
  body: PrepareGeneralPaymentRequest,
): Promise<PreparePaymentResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/user/general-orders/payment/prepare",
    body,
  );

  return validateApiResponse(data, "일반 주문 생성에 실패 했습니다");
};

// 일반 결제 주문 성공
const successGeneralPayment = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: SuccessGeneralPaymentRequest;
}) => {
  const { data } = await axiosInstance.put(
    `/api/v2/user/general-orders/${orderId}/payment/success`,
    body,
  );
  return validateApiResponse(data, "일반 주문 성공 처리에 실패 했습니다");
};

// 일반 결제 주문 실패
const failGeneralPayment = async (orderId: number) => {
  const { data } = await axiosInstance.put(
    `/api/v2/user/general-orders/${orderId}/payment/fail`,
  );

  return validateApiResponse(data, "일반 주문 실패 처리에 실패 했습니다");
};

// 일반 결제 주문 취소
const cancelGeneralPayment = async (orderId: number) => {
  const { data } = await axiosInstance.put(
    `/api/v2/user/general-orders/${orderId}/payment/cancel`,
  );

  return validateApiResponse(data, "일반 주문 취소 처리에 실패 했습니다");
};

export {
  cancelGeneralPayment,
  cancelSubscriptionPayment,
  failGeneralPayment,
  failSubscriptionPayment,
  getGeneralCheckout,
  getSubscriptionCheckout,
  prepareGeneralPayment,
  prepareSubscriptionPayment,
  successGeneralPayment,
  successSubscriptionPayment,
  validateSubscriptionPayment,
};
