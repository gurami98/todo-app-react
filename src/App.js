import './App.css';
import './styles/shared/Dropdown.css'
import './styles/shared/CustomCheckbox.css'
import { useEffect, useState } from "react";
import {
	addTodoItem,
	deleteSelectedTodos,
	deleteTodoItem,
	getAllTodoItems,
	toggleAllTodosDone,
	updateTodoItem
} from "./API/todoAPI";
import TasksList from './components/TasksList'
import Form from './components/Form'
import Pagination from './components/Pagination'
import CustomAlert from "./components/CustomAlert";
import FilterComponent from "./components/FilterComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux'
import {
	addTodo, changePagination, closeAlert,
	deleteSelected,
	deleteTodo,
	markAllDone,
	markDone, renderPagination,
	renderTodos,
	setActivePage, showAlert, toggleIsAllChecked, toggleLoading
} from "./store/actionCreators";

const defaultCategory = 'All Categories'

const App = () => {
	const dispatch = useDispatch()
	const todosList = useSelector(({todos}) => todos)
	const activePageSelector = useSelector(({activePage}) => activePage)
	const itemsToShowCountSelector = useSelector(({itemsToShowCount}) => itemsToShowCount)
	const alertInfoSelector = useSelector(({alertInfo}) => alertInfo)
	const activeCategorySelector = useSelector(({activeCategory}) => activeCategory)
	const isAllCheckedSelector = useSelector(({isAllChecked}) => isAllChecked)
	const loadingSelector = useSelector(({loading}) => loading)
	const pagesToShowSelector = useSelector(({paginationInfo}) => paginationInfo.pagesToShow)

	const myStorage = window.localStorage.getItem('typeDropdownData')
	if (!myStorage) window.localStorage.setItem('typeDropdownData', JSON.stringify(['University', 'Home', 'Work']))

	let startIndex = (activePageSelector - 1) * itemsToShowCountSelector
	let endIndex = startIndex + itemsToShowCountSelector

	let filteredArrByCategory = todosList.filter(item => (item.taskType === activeCategorySelector || activeCategorySelector === defaultCategory) && item)
	let itemsToShow = filteredArrByCategory.slice(startIndex, endIndex)


	let listCount = filteredArrByCategory.length
	let pageCount = Math.ceil(listCount / itemsToShowCountSelector) || 1

	useEffect(() => {
		getList()
		dispatch(renderPagination({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1}))
	}, [])

	useEffect(() => {
		dispatch(toggleIsAllChecked(todosList.every(item => item.done)))
	}, [todosList])

	useState(() => {
		dispatch(setActivePage(1))
	}, [activeCategorySelector])

	useEffect(() => {
		let listCount = filteredArrByCategory.length
		let pageCount = Math.ceil(listCount / itemsToShowCountSelector)
		dispatch(changePagination({
			pageNumbers: pageCount,
			startPage: (activePageSelector >= pageCount - 4 && activePageSelector > 5) ? pageCount - 4 : activePageSelector <= 5 ? 1 : activePageSelector - 2,
			endPage: activePageSelector >= pageCount - 5 ? pageCount : activePageSelector <= 5 ? 5 : activePageSelector + 2,
		}))
	}, [listCount])

	useEffect(() => {
		dispatch(changePagination({
			pageNumbers: pageCount,
			startPage: pageCount > 5 ? pageCount - pagesToShowSelector + 1 : 1,
			endPage: pageCount,
		}))
		dispatch(setActivePage(pageCount))
	}, [itemsToShowCountSelector])

	const alertHandler = (alertText, alertType) => {
		dispatch(showAlert(alertText, alertType))
		setTimeout(() => {
			dispatch(closeAlert())
		}, 3000)
	}

	const getList = async () => {
		try {
			const response = await getAllTodoItems()
			const data = await response.json()
			dispatch(toggleLoading(false))
			dispatch(renderTodos(data))
			listCount = data.length
			pageCount = Math.ceil(listCount / itemsToShowCountSelector)
			dispatch(changePagination({
				endPage: pageCount < 7 ? pageCount : 5,
				startPage: 1
			}))
			dispatch(setActivePage(1))
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const changePage = (page) => {
		dispatch(setActivePage(page))
		if (pageCount >= pagesToShowSelector) {
			if (page <= pagesToShowSelector) {
				dispatch(changePagination({endPage: pagesToShowSelector, startPage: 1}))
			} else if (page >= pageCount - pagesToShowSelector + 1) {
				dispatch(changePagination({
					endPage: pageCount,
					startPage: pageCount - pagesToShowSelector + 1
				}))
			} else {
				dispatch(changePagination({endPage: page + 2, startPage: page - 2}))
			}
		}
	}

	const submitHandler = async (listData) => {
		try {
			const resp = await addTodoItem(listData)
			dispatch(addTodo(resp.data))
			alertHandler('Item Successfully Added', 'success')
			listCount++
			pageCount = Math.ceil(listCount / itemsToShowCountSelector)
			dispatch(setActivePage(pageCount))
			dispatch(changePagination({
				pageNumbers: pageCount,
				startPage: pageCount > 6 ? pageCount - 4 : 1,
				endPage: pageCount,
			}))
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const selectAllHandler = async () => {
		dispatch(toggleIsAllChecked(!isAllCheckedSelector))
		try {
			await toggleAllTodosDone({done: !isAllCheckedSelector})
			dispatch(markAllDone(!isAllCheckedSelector))
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const deleteSelectedHandler = async () => {
		try {
			await deleteSelectedTodos()
			alertHandler('Items Successfully Removed', 'success')
			dispatch(deleteSelected())
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
		let newArr = todosList.filter(item => !item.done)
		listCount = newArr.length
		pageCount = Math.ceil(listCount / itemsToShowCountSelector)
		dispatch(setActivePage((pageCount >= activePageSelector && pageCount > 0) ? activePageSelector : pageCount === 0 ? 1 : pageCount))
		dispatch(changePagination({
			pageNumbers: pageCount,
			startPage: activePageSelector >= pageCount - 4 ? pageCount - 4 : activePageSelector <= 5 ? 1 : activePageSelector - 2,
			endPage: activePageSelector >= pageCount - 5 ? pageCount : activePageSelector <= 5 ? 5 : activePageSelector + 2,
		}))
	}

	const editItemHandler = async (index, params) => {
		try {
			await updateTodoItem(index, params)
			alertHandler('Item Successfully Edited', 'success')
			dispatch(markDone(index, params))
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const deleteItemHandler = async (index) => {
		try {
			await deleteTodoItem(index)
			dispatch(deleteTodo(index))
			let newArr = todosList.filter(item => item._id !== index)
			listCount = newArr.length
			pageCount = Math.ceil(listCount / itemsToShowCountSelector)
			dispatch(setActivePage(activePageSelector > pageCount ? pageCount : activePageSelector))
			dispatch(changePagination({
				pageNumbers: pageCount,
				startPage: activePageSelector >= pageCount - 4 ? pageCount - 4 : activePageSelector <= 5 ? 1 : activePageSelector - 2,
				endPage: activePageSelector >= pageCount - 5 ? pageCount : activePageSelector <= 5 ? 5 : activePageSelector + 2,
			}))
			alertHandler('Item Successfully Removed', 'success')
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	let isAnyItemChecked = todosList.some(item => item.done)

	return (
		<div className="App">
			<FilterComponent
				isAnyItemChecked={isAnyItemChecked}
				selectAllHandler={selectAllHandler}
				deleteSelectedHandler={deleteSelectedHandler}/>

			<Form submitHandler={submitHandler}/>

			{
				!loadingSelector ?
					<TasksList editItemHandler={editItemHandler} deleteItemHandler={deleteItemHandler} itemsToShow={itemsToShow}/>
					: <FontAwesomeIcon className={'loading-icon'} icon={faSpinner}/>
			}

			<Pagination changePage={changePage} pageCount={pageCount}/>

			{alertInfoSelector.alertVisible && <CustomAlert/>}
		</div>
	);
}

export default App;
