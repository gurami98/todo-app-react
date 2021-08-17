import * as actions from "./actionTypes";
import {SET_ITEMS_TO_SHOW} from "./actionTypes";

export const renderTodos = (todoArr) => {
	return {
		type: actions.RENDER_TODOS,
		payload: {
			todoArr
		}
	}
}

export const addTodo = (item) => {
	return {
		type: actions.ADD_TODO,
		payload: {
			item
		}
	}
}

export const markDone = (id, params) => {
	return {
		type: actions.MARK_DONE,
		payload: {
			id,
			params
		}
	}
}

export const markAllDone = (shouldSelectAll) => {
	return {
		type: actions.MARK_ALL_DONE,
		payload: {
			shouldSelectAll
		}
	}
}

export const deleteTodo = (id) => {
	return {
		type: actions.DELETE_TODO,
		payload: {
			id
		}
	}
}

export const deleteSelected = () => {
	return {
		type: actions.DELETE_SELECTED
	}
}

export const filterTodos = (filterBy) => {
	return {
		type: actions.FILTER_TODOS,
		payload: {
			filterBy
		}
	}
}
// Filter Dropdown

export const chooseFilter = (text) => {
	return {
		type: actions.CHOOSE_FILTER_DROPDOWN,
		payload: {
			text
		}
	}
}

// Priority Dropdown

export const choosePriority = (text) => {
	return {
		type: actions.CHOOSE_PRIORITY_DROPDOWN,
		payload: {
			text
		}
	}
}

export const resetPriority = (text) => {
	return{
		type: actions.RESET_PRIORITY_DROPDOWN,
		payload: {
			text
		}
	}
}
// category dropdown
export const renderCategoryDropdown = (categoryObj) => {
	return {
		type: actions.RENDER_CATEGORY_DROPDOWN,
		payload: {
			categoryObj
		}
	}
}

export const chooseCategory = (text) => {
	return {
		type: actions.CHOOSE_CATEGORY_DROPDOWN,
		payload: {
			text
		}
	}
}

export const addCategory = (categoryText) => {
	return {
		type: actions.ADD_CATEGORY_DROPDOWN,
		payload: {
			categoryText
		}
	}
}

export const resetCategory = (text) => {
	return{
		type: actions.RESET_CATEGORY_DROPDOWN,
		payload: {
			text
		}
	}
}

export const changePagination = (paginationInfo) => {
	return {
		type: actions.CHANGE_PAGINATION,
		payload: {
			paginationInfo
		}
	}
}

export const setActivePage = (page) => {
	return {
		type: actions.SET_ACTIVE_PAGE,
		payload: {
			page
		}
	}
}

export const setItemsToShowCount = (count) => {
	return {
		type: actions.SET_ITEMS_TO_SHOW_COUNT,
		payload: {
			count
		}
	}
}

export const showAlert = (alertText, alertType) => {
	return {
		type: actions.SHOW_ALERT,
		payload: {
			alertText,
			alertType
		}
	}
}

export const closeAlert = () => {
	return {
		type: actions.CLOSE_ALERT
	}
}

export const chooseActiveCategory = (category) => {
	return {
		type: actions.CHOOSE_ACTIVE_CATEGORY,
		payload: {
			category
		}
	}
}

export const toggleIsAllChecked = (status) => {
	return{
		type: actions.TOGGLE_IS_ALL_CHECKED,
		payload: {
			status
		}
	}
}

export const toggleLoading = (status) => {
	return {
		type: actions.TOGGLE_LOADING,
		payload: {
			status
		}
	}
}

export const setFilteredArrByCategory = (todosList) => {
	return{
		type: actions.SET_FILTERED_ARR_BY_CATEGORY,
		payload: {
			todosList
		}
	}
}

export const setItemsToShow = (startIndex, endIndex) => {
	return {
		type: actions.SET_ITEMS_TO_SHOW,
		payload:{
			startIndex,
			endIndex
		}
	}
}


