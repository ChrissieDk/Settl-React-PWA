// View Transactions
export interface VoucherOldTransaction {
  id: number;
  date: string;
  type: string;
  amount: number;
  status: string;
  service: string;
}

// {
//   "pluCode": "2/gsv/gsvvouchers",
//   "voucherCode": "6789017019475589",
//   "amount": 8000,
//   "status": "01",
//   "expiryDate": "2024-08-18T14:02:01+00:00",
//   "balance": 8000,
//   "verificationCode": "6694",
//   "pluName": "GetSavvi Vouchers",
//   "createdDate": "2024-08-04T14:02:17.764593+00:00"
// },

export interface TransactionModalProps {
  isOpen: boolean;
  transactions: VoucherOldTransaction[];
  onClose: () => void;
}

// Block
export interface BlockProps {
  header: string;
  subTitle: string;
  extra: string;
  imageSrc: string;
}

// Maps
export interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;

  markers: {
    id: string;
    address?: string;
    province?: string;
    city?: string;
    postcode?: number;
    lon?: number;
    lat?: number;
    email?: string;
    tel?: number;
    providerSurname?: string;
    type?: string;
    text: string;
    subText?: string;
  }[];
}

// Homepage
export interface HeroSectionProps {
  dynamicText: string;
}

// TokenModal
export interface TokenModalProps {
  action: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface UserIn {
  email: string;
  password: string;
  firebaseId: string;
  username: string;
}

// Card
export interface Token {
  paymentInstrumentCategoryCode: string;
  issueDate: string;
  paymentToken: string;
  paymentTokenExpiryDateTime: string;
  paymentTokenStatus: string;
  truncatedPaymentInstrument: string;
  paymentInstrumentAssociationName: string;
  paymentInstrumentType: string;
  paymentInstrumentMessageSequence: string;
  defaultPaymentInstrument: boolean;
  paymentInstrumentExpiryDate: string;
  additionalPaymentTokenInformation: string;
}

// Type for fetching data from url
export interface UrlData {
  echoData: string;
  sessionId: string;
  responseCode: string;
  responseMessage: string;
}

// even if only one coucher, still need to be an array
export interface redeem {
  merchantId: string;
  transactionAmount: number;
  vouchers: voucher[];
}

export interface voucher {
  voucherCode: string;
  verificationCode: string;
}
