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
    id: number;
    lat: number;
    lng: number;
    text: string;
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
