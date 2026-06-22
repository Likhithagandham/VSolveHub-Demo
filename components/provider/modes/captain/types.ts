export type CaptainOffer = {
  id: string;
  status: string;
  expiresAt: string;
  booking: {
    id: string;
    ref: string;
    serviceName: string;
    categoryName: string;
    slot: string;
    quotedAmount: number;
    address: string;
    customerName: string;
    customerPhone: string;
    paymentMode?: string;
    pickupKm?: number;
    dropKm?: number;
    lat?: number | null;
    lng?: number | null;
  };
};

export type CaptainProfile = {
  name: string;
  phone: string;
  rating: number;
  isOnline: boolean;
};

export type CaptainTripStage = "pickup" | "otp" | "riding" | "completed";
