import { createContext, useContext, useState } from "react";
import {
  createStudentsRequest,
  deleteStudentsRequest,
  getStudentsRequest,
  getStudentRequest,
  updateStudentsRequest,
} from "../services/students";

const StudentContext = createContext();

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error("useStudents sin Contexto");
  return context;
};

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    const res = await getStudentsRequest();
    console.log(res.data)
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    try {
      const res = await deleteStudentsRequest(id);
      if (res.status === 204) setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createStudent = async (student) => {
    try {
      const res = await createStudentsRequest(student);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudent = async (id) => {
    try {
      const res = await getStudentRequest(id);
      console.log(res)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateStudent = async (id, student) => {
    try {
      await updateStudentsRequest(id, student);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        getStudents,
        deleteStudent,
        createStudent,
        getStudent,
        updateStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
