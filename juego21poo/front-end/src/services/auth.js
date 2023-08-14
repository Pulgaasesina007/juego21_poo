//import axios from "axios";
import axios from "./axios";

const API = `http://localhost:5000/api`
//export const registerRequest = async (user) => axios.post(`${API}/auth/register`, user);
export const registerRequest = async (user) => axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);