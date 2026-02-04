import {
  PrepareSubscriptionPaymentRequest,
  PrepareSubscriptionPaymentResponse,
  SubscriptionCheckoutResponse,
  SuccessSubscriptionPaymentRequest,
} from "@/types";
import { validateApiResponse } from "@/utils/auth/apiResponseUtils";
import { AxiosInstance } from "axios";
import { axiosInstance } from "../axiosInstance";

// 구독 결제 페이지 조회 - v2
const getSubscriptionCheckout = async (
  subscribeId: number,
  instance: AxiosInstance = axiosInstance
): Promise<SubscriptionCheckoutResponse> => {
  const { data } = await instance.get(
    `/api/v2/user/subscribes/${subscribeId}/order-estimate`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 정보를 불러오지 못했습니다";
  throw new Error(message);
};

// 구독 결제 준비: 결제 1단계 - v2
const prepareSubscriptionPayment = async (
  body: PrepareSubscriptionPaymentRequest
): Promise<PrepareSubscriptionPaymentResponse> => {
  const { data } = await axiosInstance.post(
    "/api/v2/user/subscribe-orders/payment/prepare",
    body
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
      }
    );

    return data.success;
  } catch (error) {
    console.error("결제 검증 API 요청 실패:", error);
    return false;
  }
};

// 정상 결제 요청: 최종 결제 완료 - v2
const successSubscriptionPayment = async ({
  orderId,
  body,
}: {
  orderId: number;
  body: SuccessSubscriptionPaymentRequest;
}) => {
  const { data } = await axiosInstance.put(
    `/api/v2/user/subscribe-orders/${orderId}/payment/success`,
    body
  );
  return validateApiResponse(data, "결제 성공 처리에 실패 했습니다");
};

// 구독 결제 실패 - v2
const failSubscriptionPayment = async (orderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/v2/user/subscribe-orders/${orderId}/payment/fail`
  );
  if (data.success) {
    return data.data;
  }
  const message = data.detailMessage ?? "결제 실패 처리에 실패했습니다";
  throw new Error(message);
};

// 구독 결제 취소 - v2
const cancelSubscriptionPayment = async (orderId: number) => {
  const { data } = await axiosInstance.post(
    `/api/v2/user/subscribe-orders/${orderId}/payment/cancel`
  );
  return validateApiResponse(data, "결제 취소 처리에 실패 했습니다");
};

export {
  cancelSubscriptionPayment,
  failSubscriptionPayment,
  getSubscriptionCheckout,
  prepareSubscriptionPayment,
  successSubscriptionPayment,
  validateSubscriptionPayment,
};
