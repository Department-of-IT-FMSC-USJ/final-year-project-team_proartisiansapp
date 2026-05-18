import { createContext, useContext, useState, ReactNode } from "react";

type Role = "buyer" | "seller" | null;

interface UserContextType {
  role: Role;
  setRole: (role: Role) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  user: any;
  setUser: (u: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
