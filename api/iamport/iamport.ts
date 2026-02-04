import {
  CreateIamportSubscriptionPaymentRequest,
  IamportSubscribeResponse,
} from "@/types/checkout";
import axios from "axios";

export { billingAgainPayment };

// 포트원 빌링키를 이용한 즉시 결제 요청
const billingAgainPayment = async (
  body: CreateIamportSubscriptionPaymentRequest
): Promise<IamportSubscribeResponse> => {
  const baseUrl = "https://dev.test.barfdog.co.kr"; // next.js 서버 경로

  try {
    const { data } = await axios.post(`${baseUrl}/api/iamport/subscribe`, body, {
      headers: {
        "Content-Type": "application/json",
        // 필요한 경우 추가 헤더
      },
      timeout: 30000, // 30초 타임아웃
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("[billingAgainPayment] Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
        },
      });
    } else {
      console.error("[billingAgainPayment] Unknown error:", error);
    }
    throw error;
  }
};
