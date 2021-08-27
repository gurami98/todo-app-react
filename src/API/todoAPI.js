import axios from "axios";
const API = 'http://localhost:3001'

export const getAllTodoItems = (currentUsername) => axios.get(`${API}/todo/get-all/${currentUsername}`)

export const addTodoItem = (item) => axios.post(`${API}/todo/add`, item)

export const toggleAllTodosDone = (status) => axios.put(`${API}/todo/update-item/all`, status)

export const deleteSelectedTodos = () => axios.delete(`${API}/todo/delete-item/selected`)

export const deleteTodoItem = (index) => axios.delete(`${API}/todo/delete-item/${index}`)

export const updateTodoItem = (index, data) => axios.put(`${API}/todo/update-item/${index}`, data)

