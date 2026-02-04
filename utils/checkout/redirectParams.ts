export type GeneralRedirectParams = {
  impUid: string;
  impSuccess: boolean;
  merchantUid: string;
  orderId: number;
  basketIdList: number[];
  errorMsg?: string;
};

export function parseGeneralParams(
  sp: URLSearchParams,
): GeneralRedirectParams | null {
  const imp_uid = sp.get("imp_uid");
  const imp_success = sp.get("imp_success");
  const merchantUid = sp.get("merchantUid");
  const orderIdStr = sp.get("order_id");
  const basketIdListStr = sp.get("basket_id_list");
  const errorMsg = sp.get("error_msg") ?? undefined;

  if (!imp_uid || !imp_success || !merchantUid || !orderIdStr) {
    return null;
  }

  const orderId = Number(orderIdStr);

  if (Number.isNaN(orderId)) {
    return null;
  }

  // TODO: 장바구니 개발 후 실제 basketIdList 파싱
  // 현재는 빈 배열 또는 빈 문자열이 올 수 있음
  let basketIdList: number[] = [];
  if (basketIdListStr && basketIdListStr.trim() !== "") {
    basketIdList = basketIdListStr
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => !Number.isNaN(id));
  }

  return {
    impUid: imp_uid,
    impSuccess: imp_success === "true",
    merchantUid,
    orderId,
    basketIdList,
    errorMsg,
  };
}

export type SubscriptionRedirectParams = {
  impUid: string;
  impSuccess: boolean;
  merchantUid: string;
  orderId: number;
  customerUid: string;
  amount: number;
  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  paymentMethod: string;
  errorMsg?: string;
  subscribeId?: number;
};

export function parseSubscriptionParams(
  sp: URLSearchParams,
): SubscriptionRedirectParams | null {
  const imp_uid = sp.get("imp_uid");
  const imp_success = sp.get("imp_success");
  const merchantUid = sp.get("merchantUid");
  const orderIdStr = sp.get("order_id");
  const customerUid = sp.get("customer_uid");
  const amountStr = sp.get("amount");

  const name = sp.get("name") ?? "";
  const buyer_name = sp.get("buyer_name") ?? "";
  const buyer_tel = sp.get("buyer_tel") ?? "";
  const buyer_email = sp.get("buyer_email") ?? "";
  const paymentMethod = sp.get("payment_method") ?? "";

  const errorMsg = sp.get("error_msg") ?? undefined;
  const subscribeIdStr = sp.get("subscription_Id") ?? undefined;

  if (
    !imp_uid ||
    !imp_success ||
    !merchantUid ||
    !orderIdStr ||
    !subscribeIdStr ||
    !customerUid ||
    !amountStr ||
    !paymentMethod
  ) {
    return null;
  }

  const orderId = Number(orderIdStr);
  const subscribeId = Number(subscribeIdStr);
  const amount = Number(amountStr);

  if (
    Number.isNaN(orderId) ||
    Number.isNaN(amount) ||
    Number.isNaN(subscribeId)
  )
    return null;

  return {
    impUid: imp_uid,
    impSuccess: imp_success === "true",
    merchantUid,
    orderId,
    customerUid,
    amount,
    name,
    buyer_name,
    buyer_tel,
    buyer_email,
    paymentMethod,
    errorMsg,
    subscribeId,
  };
}
