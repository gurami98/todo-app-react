import * as actions from "./actionTypes";
import getFilteredData, { filterData } from "../helpers/filterHelper";
import {defaultFormData} from '../components/Form/index'
let defaultFilterText = 'Sort By'
const initialState = {
	todos: [],
	filterData: {
		sort: {
			currentChoice: defaultFilterText,
			options: [filterData.az, filterData.za, filterData.oldest, filterData.newest, filterData.dueAsc,
				filterData.dueDesc, filterData.prioAsc, filterData.prioDesc],
		},
		priority: {
			currentChoice: defaultFormData.defaultPriorityText,
			options: ['Low', 'Medium', 'High'],
			optionNumbers: [1, 2, 3]
		},
		type: { // maybe change name to Category ? ? ?

		},
		isAllChecked: false,
		// itemsToShow:  {  // what is that ? ? ??  ?
		// 	currentChoice: '',
		// 	options: [],
		// },
		// categories: {
		// 	currentChoice: '',
		// 	options: [],
		// },
	},
	paginationInfo: {pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1, activePage: 1},
	itemsToShowCount: 8, // needs to be in filter Data
	alertInfo: {},
	activeCategory: 'All Categories',
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
						done: action.payload.shouldSelectAll
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
			return getFilteredData(action.payload.filterBy, state)
		case actions.CHOOSE_FILTER_DROPDOWN:
			return {...state, filterData:  {...state.filterData, sort: {...state.filterData.sort, currentChoice: action.payload.text}}}
			// priority
		case actions.CHOOSE_PRIORITY_DROPDOWN:
			return {...state, filterData:  {...state.filterData, priority: {...state.filterData.priority, currentChoice: action.payload.text}}}
		case actions.RESET_PRIORITY_DROPDOWN:
			return {...state, filterData:{...state.filterData, priority: {...state.filterData.priority, currentChoice: action.payload.text}}}
			// type
		case actions.RENDER_TYPE_DROPDOWN:
			return {...state, filterData: {...state.filterData, type: action.payload.typeObj}}
		case actions.CHOOSE_TYPE_DROPDOWN:
			return {...state, filterData: {...state.filterData, type: {...state.filterData.type, currentChoice: action.payload.text}}}
		case actions.ADD_TYPE_DROPDOWN:
			return {...state, filterData: {...state.filterData, type: {...state.filterData.type, options: [...state.filterData.type.options, action.payload.typeText]}}}
		case actions.RESET_TYPE_DROPDOWN:
			return {...state, filterData: {...state.filterData, type: {...state.filterData.type, currentChoice: action.payload.text}}}
			// pagination
		case actions.CHANGE_PAGINATION:
			return {...state, paginationInfo: {...state.paginationInfo, ...action.payload.paginationInfo}}
		case actions.SET_ACTIVE_PAGE:
			return {...state, paginationInfo: {...state.paginationInfo, activePage: action.payload.page}}
		case actions.SET_ITEMS_TO_SHOW_COUNT:
			return {...state, itemsToShowCount: action.payload.count}
			// alert info
		case actions.SHOW_ALERT:
			return {...state, alertInfo: {...state.alertInfo, alertVisible: true, alertText: action.payload.alertText, alertType: action.payload.alertType}}
		case actions.CLOSE_ALERT:
			return {...state, alertInfo: {...state.alertInfo, alertVisible: false, alertText: '', alertType: ''}}
			// category
		case actions.CHO0SE_ACTIVE_CATEGORY:
			return {...state, activeCategory: action.payload.category}
			// toggle is all checked
		case actions.TOGGLE_IS_ALL_CHECKED:
			return {...state, filterData:{...state.filterData, isAllChecked: action.payload.status}}
			// toggle loading
		case actions.TOGGLE_LOADING:
			return {...state, loading: action.payload.status}
		default:
			return state
	}
}

export default reducer