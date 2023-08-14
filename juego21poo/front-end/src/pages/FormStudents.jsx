import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useStudents } from "../context/StudentContext";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function FormStudents() {
  const { createStudent, getStudent, updateStudent } = useStudents();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateStudent(params.id, {
          ...data,
          nota1:parseFloat(data.nota1),
          nota2:parseFloat(data.nota2),
          date: dayjs.utc(data.date).format(),
        });
      } else {
        console.log("al grabar:",data)
        createStudent({
          ...data,
          nota1:parseFloat(data.nota1),
          nota2:parseFloat(data.nota2),
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/students");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    console.log(params.id)
    const loadStudent = async () => {
      if (params.id) {
        const student = await getStudent(params.id);
        setValue("nombre", student.nombre);
        setValue("nota1", student.nota1);
        setValue("nota2", student.nota2);
        
      }
    };
    loadStudent();
  }, []);

  return (
     <Card>
       
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          type="text"
          name="nombre"
          placeholder="Ingrese nombre"
          {...register("nombre",{ required: {value:true,message:"Nombre es requerido"} })}
          autoFocus
        />
        {errors.nombre && (
          <p className="text-red-500 font-semibold">{errors.nombre.message}</p>
        )}
        <Label htmlFor="nota1">nota1:</Label>
         <Input 
            type="number"
            name="nota1"
            placeholder="Escriba la nota1..."
            {...register("nota1", { required: {value:true,message:"Nota1 es requerido"} })}
          />
          {errors.nota1 && (<p className="text-red-500 font-semibold">{errors.nota1.message}</p>)}
         <Label htmlFor="nota2">nota2:</Label>
          <Input 
            type="number"
            name="nota2"
            placeholder="Escriba la nota2..."
            {...register("nota2", { required: {value:true,message:"Nota2 es requerido"} })}
          />
          {errors.nota2 && (<p className="text-red-500 font-semibold">{errors.nota2.message}</p>)}
          
        <Button>Grabar Registro</Button>
      </form>
    </Card>
     );
}