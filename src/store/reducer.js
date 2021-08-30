import * as actions from "./actionTypes"
import getFilteredData, {filterData} from "../helpers/filterHelper"
import {defaultFormData} from '../components/Form/index'

const defaultFilterText = 'Sort By'
const initialState = {
    currentUser: {
        username: 'default username'
    },
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
        category: {
            activeCategory: 'All Categories'
        },
        itemsToShowCount: 8,
    },
    paginationInfo: {pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1, activePage: 1},
    alertInfo: {},
    loading: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // FOR USER
        case actions.SET_USERNAME:
            return {...state, currentUser: {...state.currentUser, username: action.payload.username}}
        // FOR LIST
        case actions.RENDER_TODOS:
            return {...state, todos: [...action.payload.todoArr]}
        case actions.ADD_TODO:
            return {...state, todos: [...state.todos, action.payload.item]}
        case actions.MARK_DONE:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === action.payload.id ? {...todo, ...action.payload.params} : todo)
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
            return {
                ...state,
                filterData: {...state.filterData, sort: {...state.filterData.sort, currentChoice: action.payload.text}}
            }
        // priority
        case actions.CHOOSE_PRIORITY_DROPDOWN:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    priority: {...state.filterData.priority, currentChoice: action.payload.text}
                }
            }
        case actions.RESET_PRIORITY_DROPDOWN:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    priority: {...state.filterData.priority, currentChoice: action.payload.text}
                }
            }
        // category
        case actions.RENDER_CATEGORY_DROPDOWN:
            return {...state, filterData: {...state.filterData, category: action.payload.categoryObj}}
        case actions.CHOOSE_CATEGORY_DROPDOWN:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    category: {...state.filterData.category, currentChoice: action.payload.text}
                }
            }
        case actions.ADD_CATEGORY_DROPDOWN:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    category: {
                        ...state.filterData.category,
                        options: [...state.filterData.category.options, action.payload.categoryText]
                    }
                }
            }
        case actions.RESET_CATEGORY_DROPDOWN:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    category: {...state.filterData.category, currentChoice: action.payload.text}
                }
            }
        // pagination
        case actions.CHANGE_PAGINATION:
            return {...state, paginationInfo: {...state.paginationInfo, ...action.payload.paginationInfo}}
        case actions.SET_ACTIVE_PAGE:
            return {...state, paginationInfo: {...state.paginationInfo, activePage: action.payload.page}}
        case actions.SET_ITEMS_TO_SHOW_COUNT:
            return {...state, filterData: {...state.filterData, itemsToShowCount: action.payload.count}}
        // alert info
        case actions.SHOW_ALERT:
            return {
                ...state,
                alertInfo: {
                    ...state.alertInfo,
                    alertVisible: true,
                    alertText: action.payload.alertText,
                    alertType: action.payload.alertType
                }
            }
        case actions.CLOSE_ALERT:
            return {...state, alertInfo: {...state.alertInfo, alertVisible: false, alertText: '', alertType: ''}}
        // category
        case actions.CHOOSE_ACTIVE_CATEGORY:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    category: {...state.filterData.category, activeCategory: action.payload.category}
                }
            }
        // toggle loading
        case actions.TOGGLE_LOADING:
            return {...state, loading: action.payload.status}
        default:
            return state
    }
}

export default reducer