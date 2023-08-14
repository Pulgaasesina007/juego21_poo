import { useEffect } from "react";
import { useStudents } from "../context/StudentContext";
import { StudentCard } from "../components/students/StudentCard";
import { ImFileEmpty } from "react-icons/im";

export default function GetStudents() {
  const { students, getStudents } = useStudents();

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      {students.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No existen estudiantes ingresados
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {students.map((student) => (
          <StudentCard student={student} key={student._id} />
        ))}
      </div>
    </>
  );
}