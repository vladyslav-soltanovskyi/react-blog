import { createContext } from "react";

export const AuthContext = createContext({
  isLoading: true,
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  logOut: () => {},
});
