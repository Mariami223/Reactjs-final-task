import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../app/instance";
import { getUser } from "../app/util";

const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    return getUser();
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      setLoading(true);
      const { data } = await instance.post("/users/register", userData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      setUserData(data.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userInfo) => {
    try {
      setLoading(true);
      const { data } = await instance.post("/users/login", userInfo);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      setUserData(data.user);
      navigate(`/profile/${data.user.firstName}`, {
        state: { id: data.user._id },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setUserData(null);
    navigate("/");
  };

  return (
    <userContext.Provider value={{ register, userData, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
