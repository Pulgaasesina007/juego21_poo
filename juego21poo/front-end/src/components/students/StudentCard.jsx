import { useStudents } from "../../context/StudentContext";
import { Button, ButtonLink, Card } from "../ui";

export function StudentCard({ student }) {
  const { deleteStudent } = useStudents();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{student.nombre}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteStudent(student._id)}>Delete</Button>
          <ButtonLink to={`/student/${student._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Nota1:</span> {student.nota1}</p>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Nota2:</span>{student.nota2}</p>
     
    </Card>
  );
}