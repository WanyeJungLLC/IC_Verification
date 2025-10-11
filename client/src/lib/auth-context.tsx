import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuthClient, login as authLogin, logout as authLogout, getPrincipal } from "./auth";

interface AuthContextType {
  isAuthenticated: boolean;
  principal: string | null;
  neuronId: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  principal: null,
  neuronId: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [neuronId, setNeuronId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const client = await getAuthClient();
      const authenticated = await client.isAuthenticated();
      
      if (authenticated) {
        const principalId = await getPrincipal();
        setIsAuthenticated(true);
        setPrincipal(principalId);
        
        // In a real app, you'd fetch the neuron ID from the governance canister
        // For now, derive a mock neuron ID from the principal
        if (principalId) {
          const mockNeuronId = principalId.slice(0, 16);
          setNeuronId(mockNeuronId);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login() {
    setIsLoading(true);
    try {
      const success = await authLogin();
      if (success) {
        await checkAuth();
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    try {
      await authLogout();
      setIsAuthenticated(false);
      setPrincipal(null);
      setNeuronId(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        principal,
        neuronId,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
