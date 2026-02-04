// 미노출 주문 상태
const HIDDEN_ORDER_STATUS_LABEL = {
  BEFORE_PAYMENT: "결제 전",
  CANCEL_PAYMENT: "결제 취소",
  CANCEL_RESERVED_PAYMENT: "예약결제 취소",
  HOLD: "구독 보류",
  RESERVED_PAYMENT: "예약됨",
  FAILED: "실패함",
  FAILED_RESERVED_PAYMENT: "예약결제 실패",
} as const;

// 노출 주문 상태
const VISIBLE_ORDER_STATUS_LABEL = {
  PAYMENT_DONE: "결제완료",
  DELIVERY_BEFORE_COLLECTION: "배송 예정",
  PRODUCING: "생산 중",
  DELIVERY_READY: "배송 준비 중",
  TODAY_IS_NEXT_DELIVERY: "배송 준비 중",
  DELIVERY_START: "배송 시작",
  DELIVERY_DONE: "배송 완료",
  CONFIRM: "구매 확정",

  CANCEL_REQUEST: "취소 요청",
  CANCEL_DONE_SELLER: "취소 완료 (판매자 귀책)",
  CANCEL_DONE_BUYER: "취소 완료 (구매자 귀책)",

  RETURN_REQUEST: "반품 요청",
  RETURN_DONE_SELLER: "반품 완료 (판매자 귀책)",
  RETURN_DONE_BUYER: "반품 완료 (구매자 귀책)",

  EXCHANGE_REQUEST: "교환 요청",
  EXCHANGE_DONE_SELLER: "교환 완료 (판매자 귀책)",
  EXCHANGE_DONE_BUYER: "교환 완료 (구매자 귀책)",
} as const;

const ORDER_STATUS_LABEL = {
  ...HIDDEN_ORDER_STATUS_LABEL,
  ...VISIBLE_ORDER_STATUS_LABEL,
} as const;

const GENERAL_ITEM_TYPE = [
  "ALL",
  "RAW",
  "TOPPING",
  "COOKED",
  "SNACK",
  "GOODS",
  "ETC",
] as const;

export { GENERAL_ITEM_TYPE, ORDER_STATUS_LABEL };
