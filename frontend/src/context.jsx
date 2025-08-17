import { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Provider component to wrap your app and provide user data
export const AuthProvider = ({ children }) => {
  // user: stores the logged-in user's data (null if not logged in)
  const [user, setUser] = useState(null);

  // login: sets the user data after login/signup
  const login = (userData) => setUser(userData);
  // logout: clears the user data
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useAuth = () => useContext(AuthContext); 