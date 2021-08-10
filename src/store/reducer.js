import {
	ADD_TODO,
	RENDER_TODOS,
	MARK_ALL_DONE,
	DELETE_SELECTED,
	MARK_DONE,
	DELETE_TODO,
	FILTER_TODOS, RENDER_FILTER_DROPDOWN, SHOW_FILTER_DROPDOWN, CHOOSE_FILTER_DROPDOWN, HIDE_FILTER_DROPDOWN
} from "./actionTypes";
import filterTodosHandler from "../helpers/filterHelper";

const initialState = {
	todos: [],
	filterDropdown: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
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
		default:
			return state
	}
}

export default reducer