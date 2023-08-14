import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest,verifyTokenRequest } from "../services/auth";
import Cookies from 'js-cookie'

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) {
    throw new Error("No existe el contexto de la autentificacion")
  }
  return context;
}

export const Authprovider = ({children}) => {
  // estados del usuario
  const [user,setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // borra lo smensajes depues de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      // se ejecuta cuando sale del componente y se borra el objeto timer
      return () => clearTimeout(timer);
    }
  }, [errors]);

// accede a las cookies del navegador al cargar el componente
   useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);


  // registra un usuario
  const register = async (user) => {
   try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };
  // logea un usuario
  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };
  return ( 
    <authContext.Provider value={{user,register,loading,isAuthenticated,errors,login,logout}}>
        {children}
    </authContext.Provider>
  ) 
}
