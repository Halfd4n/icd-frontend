import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  authToken: string | null;
  setToken: (authToken: string) => void;
  tokenExpiry: Date | null;
  setTokenExpiry: (expiry: Date) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [authToken, setToken] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tokenExpiry && new Date() >= tokenExpiry) {
        console.log('AuthToken has expired');
        setToken(null);
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [tokenExpiry]);

  return (
    <AuthContext.Provider
      value={{ authToken, setToken, tokenExpiry, setTokenExpiry }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
