import {
	ADD_TODO,
	RENDER_TODOS,
	MARK_ALL_DONE,
	DELETE_SELECTED,
	MARK_DONE,
	DELETE_TODO,
	FILTER_TODOS,
	SHOW_FILTER_DROPDOWN,
	CHOOSE_FILTER_DROPDOWN,
	HIDE_FILTER_DROPDOWN,
	SHOW_PRIORITY_DROPDOWN,
	CHOOSE_PRIORITY_DROPDOWN,
	HIDE_PRIORITY_DROPDOWN,
	SHOW_TYPE_DROPDOWN,
	CHOOSE_TYPE_DROPDOWN,
	HIDE_TYPE_DROPDOWN,
	ADD_TYPE_DROPDOWN,
	RESET_PRIORITY_DROPDOWN,
	RESET_TYPE_DROPDOWN,
	CHANGE_PAGINATION,
	SET_ACTIVE_PAGE,
	SET_ITEMS_TO_SHOW_COUNT, SHOW_ALERT, CLOSE_ALERT, CHO0SE_ACTIVE_CATEGORY, TOGGLE_IS_ALL_CHECKED, TOGGLE_LOADING
} from "./actionTypes";
import filterTodosHandler, { filterData } from "../helpers/filterHelper";
import {defaultFormData} from '../components/Form/index'
let defaultFilterText = 'Sort By'
const initialState = {
	todos: [],
	filterDropdown: {
		filterDropdownShow: false,
		filterDropdownData: [filterData.az, filterData.za, filterData.oldest, filterData.newest, filterData.dueAsc,
			filterData.dueDesc, filterData.prioAsc, filterData.prioDesc],
		filterDropdownText: defaultFilterText
	},
	priorityDropdown: {
		priorityDropdownShow: false,
		priorityDropdownData: ['Low', 'Medium', 'High'],
		priorityDropdownDataNumbers: [1, 2, 3],
		priorityDropdownText: defaultFormData.defaultPriorityText
	},
	typeDropdown: {
		typeDropdownShow: false,
		typeDropdownData: [...JSON.parse(window.localStorage.getItem('typeDropdownData'))],
		typeDropdownText: defaultFormData.defaultTypeText
	},
	paginationInfo: {pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1},
	activePage: 1,
	itemsToShowCount: 8,
	alertInfo: {},
	activeCategory: 'All Categories',
	isAllChecked: false,
	loading: true
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// FOR LIST
		case RENDER_TODOS:
			return {...state, todos: [...action.payload.todoArr]}
		case ADD_TODO:
			return {...state, todos: [...state.todos, action.payload.item]}
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
						done: action.payload.updateQuery
					}
				})
			}
		case DELETE_TODO:
			return {...state, todos: state.todos.filter(todo => todo._id !== action.payload.id)}
		case DELETE_SELECTED:
			return {...state, todos: state.todos.filter(todo => !todo.done)}
		// FOR DROPDOWNS
			// filter
		case FILTER_TODOS:
			return filterTodosHandler(action.payload.filterQuery, state)
		case SHOW_FILTER_DROPDOWN:
			return {...state, filterDropdown: {...state.filterDropdown, filterDropdownShow: !state.filterDropdown.filterDropdownShow}}
		case CHOOSE_FILTER_DROPDOWN:
			return {...state, filterDropdown:  {...state.filterDropdown, filterDropdownShow: !state.filterDropdown.filterDropdownShow,
					filterDropdownText: action.payload.text}}
		case HIDE_FILTER_DROPDOWN:
			return {...state, filterDropdown: {...state.filterDropdown, filterDropdownShow: false}}
			// priority
		case SHOW_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownShow: !state.priorityDropdown.priorityDropdownShow}}
		case CHOOSE_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown:  {...state.priorityDropdown, priorityDropdownShow: !state.priorityDropdown.priorityDropdownShow,
					priorityDropdownText: action.payload.text}}
		case HIDE_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownShow: false}}
		case RESET_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownText: action.payload.text}}
			// type
		case SHOW_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownShow: !state.typeDropdown.typeDropdownShow}}
		case CHOOSE_TYPE_DROPDOWN:
			return {...state, typeDropdown:  {...state.typeDropdown, typeDropdownShow: !state.typeDropdown.typeDropdownShow,
					typeDropdownText: action.payload.text}}
		case HIDE_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownShow: false, typeDropdownData: [...action.payload.dataArr]}}
		case ADD_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownData: [...state.typeDropdown.typeDropdownData, action.payload.typeText]}}
		case RESET_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownText: action.payload.text}}
			// pagination
		case CHANGE_PAGINATION:
			return {...state, paginationInfo: {...state.paginationInfo, ...action.payload.paginationInfo}}
		case SET_ACTIVE_PAGE:
			return {...state, activePage: action.payload.page}
		case SET_ITEMS_TO_SHOW_COUNT:
			return {...state, itemsToShowCount: action.payload.count}
			// alert info
		case SHOW_ALERT:
			return {...state, alertInfo: {...state.alertInfo, alertVisible: true, alertText: action.payload.alertText, alertType: action.payload.alertType}}
		case CLOSE_ALERT:
			return {...state, alertInfo: {...state.alertInfo, alertVisible: false}}
			// category
		case CHO0SE_ACTIVE_CATEGORY:
			return {...state, activeCategory: action.payload.category}
			// toggle is all checked
		case TOGGLE_IS_ALL_CHECKED:
			return {...state, isAllChecked: action.payload.status}
			// toggle loading
		case TOGGLE_LOADING:
			return {...state, loading: action.payload.status}
		default:
			return state
	}
}

export default reducer