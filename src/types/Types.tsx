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
