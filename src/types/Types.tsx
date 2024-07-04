// View Transactions
export interface Transaction {
  id: number;
  date: string;
  type: string;
  amount: number;
  status: string;
  service: string;
}

export interface TransactionModalProps {
  isOpen: boolean;
  transactions: Transaction[];
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

// export interface TokenResponse {
//   transmissionDateTime: string;
//   systemTraceNumber?: string;
//   tokenRequesterId: string;
//   responseCode: string;
//   responseMessage: string;
//   retrievalReferenceNumberExtended?: string;
//   sessionId: string;
//   peripheryData?: {
//     initiationUrl?: string;
//   };
//   paymentToken?: string;
//   paymentTokenExpiryDateTime?: string;
//   paymentTokenStatus?: string;
//   truncatedPaymentInstrumentNumber?: string;
//   paymentInstrumentAssociationName?: string;
//   paymentInstrumentType?: string;
//   paymentInstrumentMessageSequence?: string;
//   defaultPaymentInstrument?: boolean;
//   paymentInstrumentExpiryDate?: string;
//   additionalPaymentTokenInformation?: string;
// }

// export interface TokenRequestBody {
//   echoData?: string;
//   sessionId: string;
//   transmissionDateTime: string;
//   transactionAmount?: number;
//   currencyCode?: string;
//   paymentToken?: string;
//   tokenRequesterId: string;
//   additionalData?: {
//     paymentTokens?: Array<{
//       mandateCategory: string;
//       paymentInstrumentValidityPeriod: number;
//     }>;
//     recurringPaymentData?: {
//       recurringPaymentCategory: string;
//       firstPaymentDate?: string;
//       lastPaymentDate?: string;
//       paymentFrequency: number;
//       regularPaymentDay?: number;
//       recurringPaymentAmount?: number;
//       recurringPaymentAmountLimit?: number;
//     };
//   };
//   peripheryData?: {
//     notificationUrl?: string;
//   };
//   assuranceData?: string;
//   structuredData?: {
//     stylesheetId?: string;
//   };
// }

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
