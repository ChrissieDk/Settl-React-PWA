// View Transactions
export interface tableTransactions {
  transactionId: string;
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  status: string;
  amount: number;
  currencyCode: string;
  voucherCode?: string;
  balance?: number;
  service: string;
  [key: string]: any;
}

export interface TransactionModalProps {
  isOpen: boolean;
  transactions: tableTransactions[];
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
  vouchers: Voucher[];
}

export interface UserIn {
  email: string;
  password: string;
  firebaseId: string;
  username: string;
}

// Card
export interface Token {
  token: string;
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

// even if only one voucher, still need to be an array
export interface redeem {
  merchantId: string;
  transactionAmount: number;
  vouchers: voucher[];
}

export interface voucher {
  voucherCode: string;
  verificationCode: string;
}

export interface Voucher {
  pluCode: string;
  voucherCode: string;
  amount: number;
  status: string;
  expiryDate: string;
  balance: number;
  verificationCode: string;
  pluName: string;
  createdDate: string;
}

export interface SignalRMessage {
  user: string;
  message: string;
  timestamp: Date;
}

export type ConnectionState =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";

export interface UseSignalRReturn {
  connectionState: ConnectionState;
  messages: { user: string; message: string; timestamp: Date }[];
  sendMessage: (methodName: string, ...args: any[]) => Promise<void>;
  error: boolean;
}
