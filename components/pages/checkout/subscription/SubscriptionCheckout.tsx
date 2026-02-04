"use client";

import { useCancelSubscriptionPayment } from "@/api/checkout/mutations/subscription/useCancelSubscriptionPayment";
import { useFailSubscriptionPayment } from "@/api/checkout/mutations/subscription/useFailSubscriptionPayment";
import { useSuccessSubscriptionPayment } from "@/api/checkout/mutations/subscription/useSuccessSubscriptionPayment";
import { useValidateSubscriptionPayment } from "@/api/checkout/mutations/subscription/useValidateSubscriptionPayment";
import { useBillingAgainPayment } from "@/api/iamport/mutations/useBillingAgainPayment";
import Spinner from "@/components/ui/spinner/Spinner";
import { CHECKOUT_ROUTES } from "@/constants";
import { useToastStore } from "@/store/useToastStore";
import { PaymentMethod } from "@/types";
import { isPortoneUserCancel } from "@/utils/checkout/isPortoneUserCancel";
import { parseSubscriptionParams } from "@/utils/checkout/redirectParams";
import { Href, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useRef } from "react";

export default function SubscriptionCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useToastStore((s) => s.addToast);

  const { mutateAsync: billingAgainPayment } = useBillingAgainPayment();
  const { mutateAsync: validatePayment } = useValidateSubscriptionPayment();
  const { mutateAsync: successPayment } = useSuccessSubscriptionPayment();
  const { mutateAsync: failPayment } = useFailSubscriptionPayment();
  const { mutateAsync: cancelPayment } = useCancelSubscriptionPayment();

  const processedRef = useRef(false);

  const params = useMemo(
    () => parseSubscriptionParams(searchParams),
    [searchParams],
  );

  useEffect(() => {
    console.log("[SubscriptionCheckout] 컴포넌트 마운트");
    console.log("params", params);
    console.log(
      "[SubscriptionCheckout] searchParams:",
      Object.fromEntries(searchParams as any),
    );
    console.log("[SubscriptionCheckout] parsed params:", params);

    const run = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      try {
        if (!params) {
          console.error("[SubscriptionCheckout] 파라미터 누락");
          throw new Error("필수 결제 정보가 누락되었습니다.");
        }

        const {
          // 1차 응답/부가정보
          impSuccess,
          errorMsg,
          subscribeId,
          // again/검증용 데이터
          orderId,
          customerUid,
          merchantUid,
          amount,
          name,
          buyer_name,
          buyer_tel,
          buyer_email,
          paymentMethod,
        } = params;

        // 취소 체크: isPortoneUserCancel 함수 사용
        if (isPortoneUserCancel(errorMsg)) {
          await cancelPayment(orderId);
          addToast("결제를 취소하였습니다.", "above-button");

          if (subscribeId) {
            router.replace(
              CHECKOUT_ROUTES.SUBSCRIPTION.order(subscribeId) as Href,
            );
          } else {
            router.replace("/");
            console.error(
              "[SubscriptionCheckout] subscribeId 누락으로 리다이렉트 불가",
            );
          }
          return;
        }

        // impSuccess가 false면 빌링키 발급 실패 → 취소로 간주
        if (!impSuccess) {
          await failPayment(orderId);
          if (subscribeId) {
            router.replace(
              CHECKOUT_ROUTES.SUBSCRIPTION.order(subscribeId) as Href,
            );
          } else {
            router.replace("/");
          }
          return;
        }

        // 모바일: again API로 실과금 → validate
        const iamportResp = await billingAgainPayment({
          customer_uid: customerUid,
          merchant_uid: merchantUid,
          amount,
          name,
          buyer_name,
          buyer_tel,
          buyer_email,
        });

        if (iamportResp.code !== 0) {
          throw new Error(`서버 결제 완료 처리 실패: ${iamportResp.message}`);
        }

        const final = iamportResp.response;
        if (!final || final.status !== "paid" || !final.imp_uid) {
          const reason = final?.fail_reason || "알 수 없는 결제 실패";
          throw new Error(`결제 실패: ${reason}`);
        }

        // 검증 (훅 반환 타입 편차 대비)
        const isValid = await validatePayment({
          orderId,
          impUid: final.imp_uid,
          customerUid,
        });

        const finalBody = {
          customerUid,
          impUid: final.imp_uid,
          merchantUid,
          paymentMethod: paymentMethod as PaymentMethod,
        };

        if (isValid) {
          await successPayment({ orderId, body: finalBody });
          router.replace(
            CHECKOUT_ROUTES.SUBSCRIPTION.completed(orderId) as Href,
          );
        } else {
          await failPayment(orderId);
          if (subscribeId) {
            router.replace(
              CHECKOUT_ROUTES.SUBSCRIPTION.failed(subscribeId) as Href,
            );
          } else {
            router.replace("/");
            console.error(
              "[SubscriptionCheckout] subscribeId 누락으로 리다이렉트 불가",
            );
          }
        }
      } catch (e) {
        console.error("[MobileSubscriptionPaymentRedirect] 처리 실패:", e);

        // 실패 API 호출
        if (params?.orderId) {
          await failPayment(params.orderId);
        }

        if (params?.subscribeId) {
          router.replace(
            CHECKOUT_ROUTES.SUBSCRIPTION.failed(params.subscribeId) as Href,
          );
        } else {
          router.replace("/");
          console.error(
            "[SubscriptionCheckout] subscribeId 누락으로 리다이렉트 불가",
          );
        }
      }
    };

    run();
  }, [
    params,
    router,
    addToast,
    billingAgainPayment,
    validatePayment,
    successPayment,
    failPayment,
    cancelPayment,
  ]);

  return <Spinner fullscreen />;
}
