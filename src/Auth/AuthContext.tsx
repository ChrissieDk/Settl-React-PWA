import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase-config";

interface AuthContextType {
  currentUser: User | null;
  isMerchant: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isMerchant: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMerchant, setIsMerchant] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed: ", user);
      setCurrentUser(user);

      // Only check localStorage when we have a valid user
      if (user) {
        const merchantStatus =
          localStorage.getItem("userIsMerchant") === "true";
        setIsMerchant(merchantStatus);
      } else {
        setIsMerchant(false); // Reset when logged out
      }

      setLoading(false);
    });

    // Sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userIsMerchant") {
        setIsMerchant(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isMerchant, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
