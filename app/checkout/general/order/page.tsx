"use client";

import { useCancelGeneralPayment } from "@/api/checkout/mutations/general/useCancelGeneralPayment";
import { useFailGeneralPayment } from "@/api/checkout/mutations/general/useFailGeneralPayment";
import { useSuccessGeneralPayment } from "@/api/checkout/mutations/general/useSuccessGeneralPayment";
import Spinner from "@/components/ui/spinner/Spinner";
import { CHECKOUT_ROUTES } from "@/constants";
import { useToastStore } from "@/store/useToastStore";
import { isPortoneUserCancel } from "@/utils/checkout/isPortoneUserCancel";
import { parseGeneralParams } from "@/utils/checkout/redirectParams";
import { Href, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useRef } from "react";

export default function GeneralCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToast = useToastStore((s) => s.addToast);

  const { mutateAsync: successPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failPayment } = useFailGeneralPayment();
  const { mutateAsync: cancelPayment } = useCancelGeneralPayment();

  const processedRef = useRef(false);

  const params = useMemo(
    () => parseGeneralParams(searchParams),
    [searchParams],
  );

  useEffect(() => {
    const run = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      try {
        if (!params) throw new Error("필수 결제 정보가 누락되었습니다.");

        const {
          impUid,
          impSuccess,
          merchantUid,
          orderId,
          basketIdList,
          errorMsg,
        } = params;

        if (isPortoneUserCancel(errorMsg)) {
          await cancelPayment(orderId);
          addToast("결제가 취소되었습니다", "above-button");
          router.push(CHECKOUT_ROUTES.GENERAL.order as Href);
          return;
        }

        // 성공/실패
        if (impSuccess) {
          await successPayment({
            orderId,
            body: {
              impUid,
              merchantUid,
              basketInfo: basketIdList.length > 0 ? { basketIdList } : null,
            },
          });
          router.replace(CHECKOUT_ROUTES.GENERAL.completed(orderId) as Href);
        } else {
          await failPayment(orderId);
          router.replace(CHECKOUT_ROUTES.GENERAL.failed as Href);
        }
      } catch (e) {
        console.error("[MobileGeneralPaymentRedirect] 처리 실패:", e);
        router.replace(CHECKOUT_ROUTES.GENERAL.failed as Href);
      }
    };

    run();
  }, [params, router, addToast, cancelPayment, successPayment, failPayment]);

  return <Spinner fullscreen />;
}
