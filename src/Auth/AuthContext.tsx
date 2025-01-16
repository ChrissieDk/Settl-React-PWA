import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User, getRedirectResult } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        // Handle the redirect result first
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const idToken = await result.user.getIdToken();
          localStorage.setItem("bearer", idToken);
          navigate("/Dashboard");
        }
      } catch (error: any) {
        console.error("Redirect Error:", error?.code, error?.message);
      }

      // Then set up the auth state listener
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const idToken = await user.getIdToken();
            localStorage.setItem("bearer", idToken);
          } catch (error) {
            console.error("Token Error:", error);
          }
        } else {
          localStorage.removeItem("bearer");
        }

        setCurrentUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    initialize();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
