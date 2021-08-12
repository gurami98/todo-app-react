import * as actions from "./actionTypes";
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
	typeDropdown: {},
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
		case actions.RENDER_TODOS:
			return {...state, todos: [...action.payload.todoArr]}
		case actions.ADD_TODO:
			return {...state, todos: [...state.todos, action.payload.item]}
		case actions.MARK_DONE:
			return {
				...state, todos: state.todos.map(todo => todo._id === action.payload.id ? {...todo, ...action.payload.params} : todo)
			}
		case actions.MARK_ALL_DONE:
			return {
				...state,
				todos: state.todos.map(todo => {
					return {
						...todo,
						done: action.payload.updateQuery
					}
				})
			}
		case actions.DELETE_TODO:
			return {...state, todos: state.todos.filter(todo => todo._id !== action.payload.id)}
		case actions.DELETE_SELECTED:
			return {...state, todos: state.todos.filter(todo => !todo.done)}
		// FOR DROPDOWNS
			// filter
		case actions.FILTER_TODOS:
			return filterTodosHandler(action.payload.filterQuery, state)
		case actions.SHOW_FILTER_DROPDOWN:
			return {...state, filterDropdown: {...state.filterDropdown, filterDropdownShow: !state.filterDropdown.filterDropdownShow}}
		case actions.CHOOSE_FILTER_DROPDOWN:
			return {...state, filterDropdown:  {...state.filterDropdown, filterDropdownShow: !state.filterDropdown.filterDropdownShow,
					filterDropdownText: action.payload.text}}
		case actions.HIDE_FILTER_DROPDOWN:
			return {...state, filterDropdown: {...state.filterDropdown, filterDropdownShow: false}}
			// priority
		case actions.SHOW_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownShow: !state.priorityDropdown.priorityDropdownShow}}
		case actions.CHOOSE_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown:  {...state.priorityDropdown, priorityDropdownShow: !state.priorityDropdown.priorityDropdownShow,
					priorityDropdownText: action.payload.text}}
		case actions.HIDE_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownShow: false}}
		case actions.RESET_PRIORITY_DROPDOWN:
			return {...state, priorityDropdown: {...state.priorityDropdown, priorityDropdownText: action.payload.text}}
			// type
		case actions.RENDER_TYPE_DROPDOWN:
			return {...state, typeDropdown: action.payload.typeObj}
		case actions.SHOW_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownShow: !state.typeDropdown.typeDropdownShow}}
		case actions.CHOOSE_TYPE_DROPDOWN:
			return {...state, typeDropdown:  {...state.typeDropdown, typeDropdownShow: !state.typeDropdown.typeDropdownShow,
					typeDropdownText: action.payload.text}}
		case actions.HIDE_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownShow: false, typeDropdownData: [...action.payload.dataArr]}}
		case actions.ADD_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownData: [...state.typeDropdown.typeDropdownData, action.payload.typeText]}}
		case actions.RESET_TYPE_DROPDOWN:
			return {...state, typeDropdown: {...state.typeDropdown, typeDropdownText: action.payload.text}}
			// pagination
		case actions.CHANGE_PAGINATION:
			return {...state, paginationInfo: {...state.paginationInfo, ...action.payload.paginationInfo}}
		case actions.SET_ACTIVE_PAGE:
			return {...state, activePage: action.payload.page}
		case actions.SET_ITEMS_TO_SHOW_COUNT:
			return {...state, itemsToShowCount: action.payload.count}
			// alert info
		case actions.SHOW_ALERT:
			return {...state, alertInfo: {...state.alertInfo, alertVisible: true, alertText: action.payload.alertText, alertType: action.payload.alertType}}
		case actions.CLOSE_ALERT:
			return {...state, alertInfo: {...state.alertInfo, alertVisible: false}}
			// category
		case actions.CHO0SE_ACTIVE_CATEGORY:
			return {...state, activeCategory: action.payload.category}
			// toggle is all checked
		case actions.TOGGLE_IS_ALL_CHECKED:
			return {...state, isAllChecked: action.payload.status}
			// toggle loading
		case actions.TOGGLE_LOADING:
			return {...state, loading: action.payload.status}
		default:
			return state
	}
}

export default reducer