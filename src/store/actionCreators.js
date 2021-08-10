import {
	ADD_TODO,
	RENDER_TODOS,
	MARK_ALL_DONE,
	DELETE_SELECTED,
	MARK_DONE,
	DELETE_TODO,
	FILTER_TODOS, RENDER_FILTER_DROPDOWN, SHOW_FILTER_DROPDOWN, CHOOSE_FILTER_DROPDOWN, HIDE_FILTER_DROPDOWN
} from "./actionTypes";

export const renderTodos = (todoArr) => {
	return {
		type: RENDER_TODOS,
		payload: todoArr
	}
}

export const addTodo = (item) => {
	return {
		type: ADD_TODO,
		payload: item
	}
}

export const markDone = (id, params) => {
	return {
		type: MARK_DONE,
		payload: {
			id,
			params
		}
	}
}

export const markAllDone = (updateQuery) => {
	return {
		type: MARK_ALL_DONE,
		payload: updateQuery
	}
}

export const deleteTodo = (id) => {
	return {
		type: DELETE_TODO,
		payload: id
	}
}

export const deleteSelected = () => {
	return {
		type: DELETE_SELECTED
	}
}

export const filterTodos = (filterQuery) => {
	return {
		type: FILTER_TODOS,
		payload: filterQuery
	}
}

export const renderFilterDropdown = (dropdownObj) => {
	return {
		type: RENDER_FILTER_DROPDOWN,
		payload: dropdownObj
	}
}

export const showFilter = () => {
	return {
		type: SHOW_FILTER_DROPDOWN
	}
}

export const chooseFilter = (text) => {
	return {
		type: CHOOSE_FILTER_DROPDOWN,
		payload: text
	}
}

export const hideFilter = () => {
	return{
		type: HIDE_FILTER_DROPDOWN
	}
}


