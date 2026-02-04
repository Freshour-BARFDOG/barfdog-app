import { PAYMENT_METHOD } from "@/constants/checkout";
import { UrlObject, ValueOfTuple } from "./common";
import { DeliveryAddress, DeliveryRequest } from "./delivery";
import { GENERAL_ITEM_TYPE, ORDER_STATUS_LABEL } from "./order";
import { DELIVERY_PLAN, MEAL_PLAN, PLAN_TYPE } from "./subscription";

interface BillingAgainPaymentResponse {
  code: number;
  message: string;
  response?: {
    imp_uid: string;
    status: string;
    fail_reason?: string;
  };
}

interface BillingAgainPaymentRequest {
  customer_uid: string;
  merchant_uid?: string | null;
  memberCouponId?: number | null;
  amount: number;
  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
}

interface SuccessSubscriptionPaymentRequest {
  customerUid: string;
  impUid: string;
  merchantUid: string;
  paymentMethod: PaymentMethod;
}

interface SubscriptionCheckoutResponse {
  memberInfo: MemberInfo;
  subscribeInfo: SubscribeInfo;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
}

interface MemberInfo {
  id: number;
  /** 사용 가능한 적립금 */
  availableReward: number;
  gradeInfo: GradeInfo;
}

interface GradeInfo {
  grade: string;
  discountPercent: number; // 할인율
  rewardPercent: number; // 적립율
}

interface SubscribeInfo {
  id: number;
  planInfo: PlanInfo;
  recipeList: SubscribeRecipeItem[];
}

interface PlanInfo {
  name: PlanType | string;
  /** 구독 주기(주) */
  weeks: DeliveryPlan;
  /** 구독 주기(일) */
  days: number;
  /** 1일 급여 횟수 */
  mealCount: MealPlan;
}

interface SubscribeRecipeItem {
  displayImageUrl: UrlObject;
  recipeId: number;
  name: string;
  gramsPerMeal: number; // 이 레시피의 1끼 급여량(g)
  pricePerGram: number;
  totalOriginalPrice: number;
  originalPricePerMeal: number;
}

/**
 * 배송 정보 전체
 */
interface DeliveryInfo {
  /** 기본 배송지, 없으면 null */
  defaultAddress: DeliveryAddress | null;
  /** 이번 배송일 (YYYY-MM-DD) */
  currentDeliveryDate: string;
  /** 다음 배송 예정일 (YYYY-MM-DD) */
  nextDeliveryDate: string;
}

interface PaymentInfo {
  /** 총 상품금액(원금) */
  originalPrice: number;
  /** 플랜 할인 금액 */
  discountPlan: number;
  /** 등급 할인 금액 */
  discountGrade: number;
}

interface PrepareSubscriptionPaymentRequest {
  subscribeId: number;
  memberCouponId?: number | null;
  deliveryInfo: DeliveryInfoRequest;
  paymentInfo: PaymentInfoRequest;
}

interface DeliveryInfoRequest {
  address: DeliveryAddress;
  currentDeliveryDate: string;
}

interface PaymentInfoRequest {
  customerUid: string;
  /** 상품 원금  */
  originalPrice: number;
  /** 플랜 할인 금액 */
  discountPlan: number;
  /** 등급 할인 금액 */
  discountGrade: number;
  /** 쿠폰 할인 금액 */
  discountCoupon: number;
  /** 적립금 사용 금액 */
  discountReward: number;
  /** 총 할인 금액 */
  discountTotal: number;
  /** 초과 할인 금액 (0 이상일 때, 할인 한도를 넘은 부분 등) */
  overDiscount: number;
  /** 배송비 */
  deliveryPrice: number;
  /** 최종 결제금액 */
  paymentPrice: number;
  /** 결제 수단 */
  paymentMethod: PaymentMethod;
  /** 적립 예정 금액 */
  saveReward: number;
}

interface PreparePaymentResponse {
  orderId: number;
  orderStatus: string;
  merchantUid: string;
}

// 일반 주문 시트 조회 요청
interface GetGeneralCheckoutRequest {
  itemList: GeneralItemRequest[];
}

interface GeneralItemRequest {
  itemId: number;
  itemAmount: number;
  itemOptionList: {
    optionId: number;
    optionAmount: number;
  }[];
}

interface GetGeneralCheckoutResponse {
  memberInfo: MemberInfo;
  paymentInfo: GeneralPaymentInfo;
  defaultAddress: DeliveryAddress | null;
  itemList: GeneralItem[];
  pakageableDeliveryList: PackageableDelivery[];
}

interface GeneralPaymentInfo {
  originalPrice: number; // 상품 총액 - 원가
  paymentPrice: number; // 상품 총액 - 기본 할인 적용
  discountProduct: number; // 기본 할인금
  deliveryPrice: number;
  freeCondition: number; // 배송비 무료 최소 결제 금액
}

interface PackageableDelivery {
  id: number;
  petName: string;
  deliveryName: string;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  street: string;
  detailAddress: string;
  request: string;
  deliveryDate: string; // "YYYY-MM-DD"
}

interface GeneralItem {
  itemId: number;
  orderItemId?: number;
  name: string;
  displayImageUrl: UrlObject;
  amount: number;
  totalOriginalPrice: number; // 상품 + 옵션: 원금
  totalSalePrice: number; // 상품 + 옵션: 기본 할인 적용 금액
  totalDiscountProduct: number; // 상품 + 옵션 기본 할인금
  deliveryFree?: boolean;
  type: GeneralItemType;
  status?: OrderStatus;
  itemOptionList: GeneralItemOption[];
}

interface GeneralItemOption {
  id: number;
  name: string;
  amount: number;
  totalOriginalPrice: number;
}

interface PrepareGeneralPaymentRequest {
  itemList: GeneralItemRequest[];
  memberCouponId?: number | null; // null 또는 필드 자체 누락 모두 허용
  deliveryInfo: PrepareGeneralPaymentDeliveryInfo;
  paymentInfo: PrepareGeneralPaymentPaymentInfo;
}
// 배송 정보
interface PrepareGeneralPaymentDeliveryInfo {
  address: DeliveryRequest;
  deliveryId: number | null; // null이면 신규 배송, 숫자면 묶음배송 ID
}

// 결제 정보
interface PrepareGeneralPaymentPaymentInfo {
  originalPrice: number; // 상품 원가 총합
  discountTotal: number; // 전체 할인 합계
  discountProduct: number; // 상품 할인
  discountReward: number; // 적립금 할인
  discountCoupon: number; // 쿠폰 할인
  deliveryPrice: number; // 배송비
  paymentPrice: number; // 실제 결제 금액
  overDiscount: number; // 과할인 보정 값
  saveReward: number; // 적립 예정 포인트
  paymentMethod: string; // 예: "CREDIT_CARD"
}

// 구독, 일반 결제 주문 정보 저장 응답
interface PreparePaymentResponse {
  orderId: number;
  merchantUid: string;
  orderStatus: string; // 'BEFORE_PAYMENT'와 같은 상태
}

interface SuccessGeneralPaymentRequest {
  impUid: string;
  merchantUid: string | null;
  basketInfo: {
    basketIdList: number[];
  } | null;
}

type PaymentMethod = keyof typeof PAYMENT_METHOD;
type PlanType = ValueOfTuple<typeof PLAN_TYPE>;
type DeliveryPlan = ValueOfTuple<typeof DELIVERY_PLAN>;
type MealPlan = ValueOfTuple<typeof MEAL_PLAN>;
type OrderStatus = keyof typeof ORDER_STATUS_LABEL;
type GeneralItemType = ValueOfTuple<typeof GENERAL_ITEM_TYPE>;

export type {
  BillingAgainPaymentRequest,
  BillingAgainPaymentResponse,
  DeliveryPlan,
  GetGeneralCheckoutRequest,
  GetGeneralCheckoutResponse,
  MealPlan,
  PaymentMethod,
  PlanType,
  PrepareGeneralPaymentRequest,
  PreparePaymentResponse,
  PrepareSubscriptionPaymentRequest,
  SubscriptionCheckoutResponse,
  SuccessGeneralPaymentRequest,
  SuccessSubscriptionPaymentRequest,
};
