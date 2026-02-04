import { PAYMENT_METHOD } from "@/constants/checkout";
import { UrlObject, ValueOfTuple } from "./common";
import { DeliveryAddress } from "./delivery";
import { DELIVERY_PLAN, MEAL_PLAN, PLAN } from "./subscription";

interface IamportSubscribeResponse {
  code: number;
  message: string;
  response?: {
    imp_uid: string;
    status: string;
    fail_reason?: string;
  };
}

interface CreateIamportSubscriptionPaymentRequest {
  customer_uid: string;
  merchant_uid?: string | null;
  memberCouponId?: number | null;
  amount: number;
  name: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_email: string;
  buyer_addr: string;
  buyer_postcode: string;
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
  name: Plan | string;
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

interface PrepareSubscriptionPaymentResponse {
  orderId: number;
  orderStatus: string;
  merchantUid: string;
}

type PaymentMethod = keyof typeof PAYMENT_METHOD;
type Plan = ValueOfTuple<typeof PLAN>;
type DeliveryPlan = ValueOfTuple<typeof DELIVERY_PLAN>;
type MealPlan = ValueOfTuple<typeof MEAL_PLAN>;
export type {
  CreateIamportSubscriptionPaymentRequest,
  DeliveryPlan,
  IamportSubscribeResponse,
  MealPlan,
  PaymentMethod,
  Plan,
  PrepareSubscriptionPaymentRequest,
  PrepareSubscriptionPaymentResponse,
  SubscriptionCheckoutResponse,
  SuccessSubscriptionPaymentRequest,
};
