import {
  BillingAgainPaymentRequest,
  BillingAgainPaymentResponse,
} from "@/types/checkout";
import axios from "axios";

export { billingAgainPayment };

// 포트원 빌링키를 이용한 즉시 결제 요청
const billingAgainPayment = async (
  body: BillingAgainPaymentRequest,
): Promise<BillingAgainPaymentResponse> => {
  const baseUrl = process.env.EXPO_PUBLIC_WEB_BASE_URL!;
  const { data } = await axios.post(`${baseUrl}/api/iamport/subscribe`, body);
  return data;
};
