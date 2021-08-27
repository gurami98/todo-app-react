import axios from "axios";
const API = 'http://localhost:3001'

export const registerUser = (user) => axios.post(`${API}/user/register`, user)
export const loginUser = (user) => axios.post(`${API}/user/login`, user)
export const welcomeUser = (token) => axios.post(`${API}/user/welcome`, token)