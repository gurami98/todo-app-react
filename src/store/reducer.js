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
import filterTodosHandler from "../helpers/filterHelper";

const initialState = {
	todos: [],
	filterDropdown: {},
	priorityDropdown: {},
	typeDropdown: {},
	paginationInfo: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// FOR LIST
		case RENDER_TODOS:
			return {...state, todos: [...state.todos, ...action.payload]}
		case ADD_TODO:
			return {...state, todos: [...state.todos, action.payload]}
		case MARK_DONE:
			return {
				...state, todos: state.todos.map(todo => todo._id === action.payload.id ? {...todo, ...action.payload.params} : todo)
			}
		case MARK_ALL_DONE:
			return {
				...state,
				todos: state.todos.map(todo => {
					return {
						...todo,
						done: action.payload
					}
				})
			}
		case DELETE_TODO:
			return {...state, todos: state.todos.filter(todo => todo._id !== action.payload)}
		case DELETE_SELECTED:
			return {...state, todos: state.todos.filter(todo => !todo.done)}
		// FOR DROPDOWNS
			// filter
		case FILTER_TODOS:
			return filterTodosHandler(action.payload, state)
		case RENDER_FILTER_DROPDOWN:
			return {...state, filterDropdown: action.payload}
		case SHOW_FILTER_DROPDOWN:
			return {...state, filterDropdown: {...state.filterDropdown, filterDropdownShow: !state.filterDropdown.filterDropdownShow}}
		case CHOOSE_FILTER_DROPDOWN:
			return {...state, filterDropdown:  {...state.filterDropdown, filterDropdownShow: !state.filterDropdown.filterDropdownShow,
					filterDropdownText: action.payload}}
		case HIDE_FILTER_DROPDOWN:
			return {...state, filterDropdown: {...state.filterDropdown, filterDropdownShow: false}}
			// priority
		case RENDER_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: action.payload}
		case SHOW_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownShow: !state.priorityDropdown.priorityDropdownShow}}
		case CHOOSE_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown:  {...state.priorityDropdown, priorityDropdownShow: !state.priorityDropdown.priorityDropdownShow,
					priorityDropdownText: action.payload}}
		case HIDE_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownShow: false}}
		case RESET_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownText: action.payload}}
			// type
		case RENDER_TYPE_DROPDOWN:
			return {...state, typeDropdown: action.payload}
		case SHOW_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownShow: !state.typeDropdown.typeDropdownShow}}
		case CHOOSE_TYPE_DROPDOWN:
			console.log(action)
			return {...state, typeDropdown:  {...state.typeDropdown, typeDropdownShow: !state.typeDropdown.typeDropdownShow,
					typeDropdownText: action.payload}}
		case HIDE_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownShow: false, typeDropdownData: [...action.payload]}}
		case ADD_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownData: [...state.typeDropdown.typeDropdownData, action.payload]}}
		case RESET_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownText: action.payload}}
			// pagination
		case RENDER_PAGINATION:
			return {...state, paginationInfo: action.payload}
		case CHANGE_PAGINATION:
			return {...state, paginationInfo: {...state.paginationInfo, ...action.payload}}
		default:
			return state
	}
}

export default reducer