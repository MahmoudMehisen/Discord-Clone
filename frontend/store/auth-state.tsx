"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

// Define the initial state
interface AuthState {
  token: string | null;
}

// Define the actions that can modify the state
type AuthAction =
  | { type: "SET_TOKEN"; token: string }
  | { type: "CLEAR_TOKEN" };

// Create the AuthContext
const AuthContext = createContext<
  | {
      state: AuthState;
      setToken: (token: string) => void;
      clearToken: () => void;
    }
  | undefined
>(undefined);

// Create a custom hook to access the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Define the initial state
const initialAuthState: AuthState = {
  token: null,
};

// Define the auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.token };
    case "CLEAR_TOKEN":
      return { ...state, token: null };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  // Retrieve the token from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch({ type: "SET_TOKEN", token });
    }
  }, []);

  // Define the setToken and clearToken functions
  const setToken = (token: string) => {
    dispatch({ type: "SET_TOKEN", token });
    localStorage.setItem("token", token);
  };

  const clearToken = () => {
    dispatch({ type: "CLEAR_TOKEN" });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ state: authState, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};
