interface DeliveryAddress {
  id: number;
  deliveryName: string;
  recipientName: string;
  phoneNumber: string;
  zipcode: string;
  city: string;
  street: string;
  detailAddress: string;
  isDefault: boolean;
  request: string;
}

export type { DeliveryAddress };
