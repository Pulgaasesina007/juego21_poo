//import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { registerRequest } from "../services/auth";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card, Message, Button, Input, Label } from "../components/ui";
// import { loginSchema } from "../schemas/auth";

export default function Register1() {
  const {register,handleSubmit,formState: { errors }} = useForm();
  
  const submitRegister = handleSubmit((values) => {
    console.log(values)
  });
  console.log(errors)
  // const submitRegister = handleSubmit(async (json) => {
  //   const res = await registerRequest(json)
  //   console.log(res)
  // });

  
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {/* <h1 className="text-2xl font-bold text-white">Login</h1> */}
        <form onSubmit={submitRegister}>
          <label htmlFor="email:" className="text-xs block my-1 text-slate-300">Email:</label>
          <input className="w-full bg-zinc-700 text-white px-4 py-2 "
            type="email"
            name="email"
            placeholder="su mail"
            {...register("email", { required: {value:true,message:"Mail es requerido"} })}
          />
          {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
          <label htmlFor="password" className="text-xs block my-1 text-slate-300">Password:</label>
          <input className="w-full bg-zinc-700 text-white px-4 py-2 "
            type="password"
            name="password"
            placeholder="Escriba su password"
            {...register("password", { required: {value:true,message:"Password es requerido"}, minLength: {value:6,message:"password minimo 6 caracteres"} })}
          />
           {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}
         
          <button type="submit" 
                  className="bg-indigo-500 px-4 py-1 rounded-md my-2">Registrarse
          </button>
        </form>

        <p className="flex gap-x-2 justify-between text-white">
          Ya tienes una cuenta? <Link to="/login" className="text-sky-500">Login</Link>
        </p>
    </div>
  );
}
