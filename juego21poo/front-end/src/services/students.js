import axios from "./axios";

export const getStudentsRequest = async () => axios.get("/student");

export const createStudentsRequest = async (student) => axios.post("/student", student);

export const updateStudentsRequest = async (id,student) =>
  axios.put(`/student/${id}`, student);

export const deleteStudentsRequest = async (id) => axios.delete(`/student/${id}`);

export const getStudentRequest = async (id) => axios.get(`/student/${id}`);
