import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, loading, setLoading }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(CurrentUserContext);
}
