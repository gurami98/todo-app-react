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
import { connect } from 'react-redux'
import * as actionCreators from "./store/actionCreators";
import { bindActionCreators } from "redux";

const defaultCategory = 'All Categories'

const App = ({
	             //state
	             todosList,
	             activePageSelector,
	             itemsToShowCountSelector,
	             alertInfoSelector,
	             activeCategorySelector,
	             isAllCheckedSelector,
	             loadingSelector,
	             pagesToShowSelector,
	             // actions
	             addTodo,
	             changePagination,
	             closeAlert,
	             deleteSelected,
	             deleteTodo,
	             markAllDone,
	             markDone,
	             renderPagination,
	             renderTodos,
	             setActivePage,
	             showAlert,
	             toggleIsAllChecked,
	             toggleLoading
             }) => {

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
		renderPagination({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1})
	}, [])

	useEffect(() => {
		toggleIsAllChecked(todosList.every(item => item.done))
	}, [todosList])

	useState(() => {
		setActivePage(1)
	}, [activeCategorySelector])

	useEffect(() => {
		let listCount = filteredArrByCategory.length || 1
		let pageCount = Math.ceil(listCount / itemsToShowCountSelector)
		setActivePage(pageCount > activePageSelector ? activePageSelector : pageCount)
		changePagination({
			pageNumbers: pageCount,
			startPage: (activePageSelector >= pageCount - 4 && activePageSelector > 5 && pageCount > 5) ? pageCount - 4 : (activePageSelector <= 5 || pageCount <= 5) ? 1 : activePageSelector - 2,
			endPage: activePageSelector >= pageCount - 5 ? pageCount : activePageSelector <= 5 ? 5 : activePageSelector + 2,
		})
	}, [listCount])

	useEffect(() => {
		changePagination({
			pageNumbers: pageCount,
			startPage: pageCount > 5 ? pageCount - pagesToShowSelector + 1 : 1,
			endPage: pageCount,
		})
		setActivePage(pageCount)
	}, [itemsToShowCountSelector])

	const alertHandler = (alertText, alertType) => {
		showAlert(alertText, alertType)
		setTimeout(() => {
			closeAlert()
		}, 3000)
	}

	const getList = async () => {
		try {
			const response = await getAllTodoItems()
			const data = await response.json()
			console.log(data)
			toggleLoading(false)
			renderTodos(data)
			listCount = data.length
			pageCount = Math.ceil(listCount / itemsToShowCountSelector)
			changePagination({
				endPage: pageCount < 7 ? pageCount : 5,
				startPage: 1
			})
			setActivePage(1)
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const changePage = (page) => {
		setActivePage(page)
		if (pageCount >= pagesToShowSelector) {
			if (page <= pagesToShowSelector) {
				changePagination({endPage: pagesToShowSelector, startPage: 1})
			} else if (page >= pageCount - pagesToShowSelector + 1) {
				changePagination({
					endPage: pageCount,
					startPage: pageCount - pagesToShowSelector + 1
				})
			} else {
				changePagination({endPage: page + 2, startPage: page - 2})
			}
		}
	}

	const submitHandler = async (listData) => {
		try {
			const resp = await addTodoItem(listData)
			addTodo(resp.data)
			alertHandler('Item Successfully Added', 'success')
			listCount++
			pageCount = Math.ceil(listCount / itemsToShowCountSelector)
			setActivePage(pageCount)
			changePagination({
				pageNumbers: pageCount,
				startPage: pageCount > 6 ? pageCount - 4 : 1,
				endPage: pageCount,
			})
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const selectAllHandler = async () => {
		toggleIsAllChecked(!isAllCheckedSelector)
		try {
			await toggleAllTodosDone({done: !isAllCheckedSelector})
			markAllDone(!isAllCheckedSelector)
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const deleteSelectedHandler = async () => {
		try {
			await deleteSelectedTodos()
			alertHandler('Items Successfully Removed', 'success')
			deleteSelected()
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
		let newArr = todosList.filter(item => !item.done)
		listCount = newArr.length
		pageCount = Math.ceil(listCount / itemsToShowCountSelector)
		setActivePage((pageCount >= activePageSelector && pageCount > 0) ? activePageSelector : pageCount === 0 ? 1 : pageCount)
		changePagination({
			pageNumbers: pageCount,
			startPage: activePageSelector >= pageCount - 4 ? pageCount - 4 : activePageSelector <= 5 ? 1 : activePageSelector - 2,
			endPage: activePageSelector >= pageCount - 5 ? pageCount : activePageSelector <= 5 ? 5 : activePageSelector + 2,
		})
	}

	const editItemHandler = async (index, params) => {
		try {
			await updateTodoItem(index, params)
			alertHandler('Item Successfully Edited', 'success')
			markDone(index, params)
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const deleteItemHandler = async (index) => {
		try {
			await deleteTodoItem(index)
			deleteTodo(index)
			let newArr = todosList.filter(item => item._id !== index)
			listCount = newArr.length
			pageCount = Math.ceil(listCount / itemsToShowCountSelector)
			setActivePage(activePageSelector > pageCount ? pageCount : activePageSelector)
			changePagination({
				pageNumbers: pageCount,
				startPage: activePageSelector >= pageCount - 4 ? pageCount - 4 : activePageSelector <= 5 ? 1 : activePageSelector - 2,
				endPage: activePageSelector >= pageCount - 5 ? pageCount : activePageSelector <= 5 ? 5 : activePageSelector + 2,
			})
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

const mapStateToProps = (state) => {
	return {
		todosList: state.todos,
		activePageSelector: state.activePage,
		itemsToShowCountSelector: state.itemsToShowCount,
		alertInfoSelector: state.alertInfo,
		activeCategorySelector: state.activeCategory,
		isAllCheckedSelector: state.isAllChecked,
		loadingSelector: state.loading,
		pagesToShowSelector: state.paginationInfo.pagesToShow
	}
}

const mapDispatchToProps = (dispatch) => {
	const boundActionCreators = bindActionCreators({
		...actionCreators
	}, dispatch)
	return {
		...boundActionCreators
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
