import {
	ADD_TODO,
	RENDER_TODOS,
	MARK_ALL_DONE,
	DELETE_SELECTED,
	MARK_DONE,
	DELETE_TODO,
	FILTER_TODOS,
	RENDER_FILTER_DROPDOWN,
	SHOW_FILTER_DROPDOWN,
	CHOOSE_FILTER_DROPDOWN,
	HIDE_FILTER_DROPDOWN,
	RENDER_PRIORITY_DROPDOWN,
	SHOW_PRIORITY_DROPDOWN,
	CHOOSE_PRIORITY_DROPDOWN,
	HIDE_PRIORITY_DROPDOWN,
	RENDER_TYPE_DROPDOWN,
	SHOW_TYPE_DROPDOWN,
	CHOOSE_TYPE_DROPDOWN,
	HIDE_TYPE_DROPDOWN,
	ADD_TYPE_DROPDOWN,
	RESET_PRIORITY_DROPDOWN, RESET_TYPE_DROPDOWN, RENDER_PAGINATION, CHANGE_PAGINATION
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
// Filter Dropdown
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

// Priority Dropdown
export const renderPriorityDropdown = (dropdownObj) => {
	return {
		type: RENDER_PRIORITY_DROPDOWN,
		payload: dropdownObj
	}
}

export const showPriority = () => {
	return {
		type: SHOW_PRIORITY_DROPDOWN
	}
}

export const choosePriority = (text) => {
	return {
		type: CHOOSE_PRIORITY_DROPDOWN,
		payload: text
	}
}

export const hidePriority = () => {
	return{
		type: HIDE_PRIORITY_DROPDOWN
	}
}

export const resetPriority = (text) => {
	return{
		type: RESET_PRIORITY_DROPDOWN,
		payload: text
	}
}

// Type Dropdown
export const renderTypeDropdown = (dropdownObj) => {
	return {
		type: RENDER_TYPE_DROPDOWN,
		payload: dropdownObj
	}
}

export const showType = () => {
	return {
		type: SHOW_TYPE_DROPDOWN
	}
}

export const chooseType = (text) => {
	return {
		type: CHOOSE_TYPE_DROPDOWN,
		payload: text
	}
}

export const hideType = (dataArr) => {
	return{
		type: HIDE_TYPE_DROPDOWN,
		payload: dataArr
	}
}

export const addType = (typeText) => {
	return {
		type: ADD_TYPE_DROPDOWN,
		payload: typeText
	}
}

export const resetType = (text) => {
	return{
		type: RESET_TYPE_DROPDOWN,
		payload: text
	}
}

export const renderPagination = (paginationInfo) => {
	return {
		type: RENDER_PAGINATION,
		payload: paginationInfo
	}
}

export const changePagination = (paginationInfo) => {
	return {
		type: CHANGE_PAGINATION,
		payload: paginationInfo
	}
}


