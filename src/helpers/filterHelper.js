import { filterData } from "../components/FilterComponent";

const filterTodosHandler = (filterQuery, state) => {
	let filteredTodoArr
	switch (filterQuery) {
		case filterData.az:
			return filteredTodoArr = {...state, todos: [...state.todos].sort((a, b) => a.text.localeCompare(b.text))}
		case filterData.za:
			return filteredTodoArr = {...state, todos: [...state.todos].sort((a, b) => b.text.localeCompare(a.text))}
		case filterData.oldest:
			return filteredTodoArr = {...state, todos: [...state.todos].sort((a, b) => new Date(a.timeAdded) - new Date(b.timeAdded))}
		case filterData.newest:
			return filteredTodoArr = {...state, todos: [...state.todos].sort((a, b) => new Date(b.timeAdded) - new Date(a.timeAdded))}
		case filterData.dueAsc:
			return filteredTodoArr = {...state, todos: [...state.todos].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))}
		case filterData.dueDesc:
			return filteredTodoArr = {...state, todos: [...state.todos].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))}
		case filterData.prioAsc:
			return filteredTodoArr = {...state, todos: [...state.todos].sort((a, b) => a.priority - b.priority)}
		case filterData.prioDesc:
			return filteredTodoArr = {...state, todos: [...state.todos].sort((a, b) => b.priority - a.priority)}
		default:
			return;
	}
}

export default filterTodosHandler