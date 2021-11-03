import axios from "axios";
// const API = 'http://localhost:3001'
const API = 'https://todo-app-backend98.herokuapp.com'

export const registerUser = (user) => axios.post(`${API}/user/register`, user)
export const loginUser = (user) => axios.post(`${API}/user/login`, user)
export const welcomeUser = (token) => axios.post(`${API}/user/welcome`, token)
