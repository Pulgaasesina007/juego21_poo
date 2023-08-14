//import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { registerRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card, Message, Button, Input, Label } from "../components/ui";
// import { loginSchema } from "../schemas/auth";

export default function Login() {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const {login,isAuthenticated,errors:loginErrors} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if (isAuthenticated) navigate("/Students");
  },[isAuthenticated])

  const submitLogin = handleSubmit( (body) => {
    login(body)
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
       <div className="bg-white max-w-md w-full p-10 rounded-md">
        <ul className="bg-red-700 text-white rounded-md text-center">
          {loginErrors.map((error, i) => (
            <li key={i}>{error}</li> 
          ))}
        </ul>
        <h2 className="text-2xl font-bold text-violet-800 uppercase text-center">Login de Autentificacion</h2>
        <form onSubmit={submitLogin} className="bg-violet-300">
          <label htmlFor="email:" className="text-md block my-1 text-black">Email:</label>
          <input className="w-full bg-white px-4 py-2 rounded-md text-black"
            type="email"
            name="email"
            placeholder="Escriba su mail..."
            {...register("email", { required: {value:true,message:"Mail es requerido"} })}
          />
          {errors.email && (<p className="text-red-500 font-semibold">{errors.email.message}</p>)}
          <label htmlFor="password" className="text-md block my-1 text-black">Password:</label>
          <input className="w-full bg-white px-4 py-2 rounded-md text-black"
            type="password"
            name="password"
            placeholder="Escriba su password..."
            {...register("password", { required: {value:true,message:"Password es requerido"} })}
          />
           {errors.password && (<p className="text-red-500 font-semibold">{errors.password.message}</p>)}
         
          <button type="submit" 
                  className="bg-indigo-500 px-4 py-1 rounded-md my-2">Registrarse
          </button>
        </form>

        <p className="flex gap-x-2 justify-between text-violet-700">
          No tienes una cuenta...? <Link to="/register" className="text-sky-500 font-bold">Registrarse</Link>
        </p>
       </div> 
    </div>
  );
}
