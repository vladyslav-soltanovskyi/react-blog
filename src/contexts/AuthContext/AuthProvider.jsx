import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/store/actions/notifications";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import api from "@/services/api";

export const AuthProvider = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setTokenData] = useState(null);

  const setToken = useCallback((tokenData) => {
    setTokenData(tokenData);

    if (tokenData) {
      Cookies.set("auth-token", tokenData, { expires: 30 });
    } else {
      Cookies.remove("auth-token");
    }
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setToken]);

  const loadData = useCallback(async () => {
    const tokenData = Cookies.get("auth-token");
    setTokenData(tokenData);

    try {
      if (tokenData) {
        const { _id, fullName, email, createdAt } = await api.auth.authMe();
        setUser({ _id, fullName, email, createdAt });
      }
    } catch (e) {
      setToken(null);
      dispatch(addNotification(e?.response?.data?.error, "error"));
    } finally {
      setIsLoading(false);
    }
  }, [setToken, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoading,
      user,
      token,
      setUser,
      setToken,
      logOut,
    }),
    [isLoading, user, token, setToken, logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
