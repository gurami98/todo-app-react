import axios from "axios";
// const API = 'http://localhost:3001'
const API = 'https://todo-app-backend98.herokuapp.com'

export const getAllTodoItems = (token) => axios.get(`${API}/todo/get-all`, {
    headers: {
        'x-access-token': token
    }
})

export const addTodoItem = (item) => axios.post(`${API}/todo/add`, item)

export const toggleAllTodosDone = (token, status) => axios.put(`${API}/todo/update-item/all`, {token, status})

export const deleteSelectedTodos = (token) => axios.delete(`${API}/todo/delete-item/selected`, {
    headers: {
        'x-access-token': token
    }
})

export const deleteTodoItem = (index) => axios.delete(`${API}/todo/delete-item/${index}`)

export const updateTodoItem = (index, data) => axios.put(`${API}/todo/update-item/${index}`, data)

