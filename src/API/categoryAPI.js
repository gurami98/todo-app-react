import axios from "axios";
// const API = 'http://localhost:3001'
const API = 'https://todo-app-backend98.herokuapp.com'

export const getAllCategories = (token) => axios.get(`${API}/category/get-all`, {
    headers: {
        'x-access-token': token
    }
})

export const addCategoryItem = (category) => axios.post(`${API}/category/add`, category)
