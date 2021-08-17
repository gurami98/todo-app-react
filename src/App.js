import './App.css';
import './styles/shared/Dropdown.css'
import './styles/shared/CustomCheckbox.css'
import { useEffect, useState } from "react";
import {getAllTodoItems} from "./API/todoAPI";
import TasksList from './components/TasksList'
import Form from './components/Form'
import Pagination from './components/Pagination'
import CustomAlert from "./components/CustomAlert";
import FilterComponent from "./components/FilterComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import {
	changePagination,
	closeAlert,
	renderTodos,
	setActivePage,
	showAlert,
	toggleIsAllChecked,
	toggleLoading
} from "./store/actionCreators";

const defaultCategory = 'All Categories'

const App = ({
	             //state
	             todosList,
	             activePageSelector,
	             itemsToShowCountSelector,
	             alertInfoSelector,
	             activeCategorySelector,
	             loadingSelector,
	             pagesToShowSelector,
	             // actions
	             changePagination,
	             closeAlert,
	             renderTodos,
	             setActivePage,
	             showAlert,
	             toggleIsAllChecked,
	             toggleLoading
             }) => {

	const myStorage = window.localStorage.getItem('categoryDropdownData')
	if (!myStorage) window.localStorage.setItem('categoryDropdownData', JSON.stringify(['University', 'Home', 'Work']))

	let startIndex = (activePageSelector - 1) * itemsToShowCountSelector
	let endIndex = startIndex + itemsToShowCountSelector

	let filteredArrByCategory = todosList.filter(item => (item.taskCategory === activeCategorySelector || activeCategorySelector === defaultCategory) && item)
	let itemsToShow = filteredArrByCategory.slice(startIndex, endIndex) // these 2 in redux store

	let listCount = filteredArrByCategory.length
	let pageCount = Math.ceil(listCount / itemsToShowCountSelector) || 1

	useEffect(() => {
		getList()
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

	return (
		<div className="App">
			<FilterComponent alertHandler={alertHandler}/>

			<Form alertHandler={alertHandler} listCount={listCount}/>

			{
				!loadingSelector ?
					<TasksList alertHandler={alertHandler} itemsToShow={itemsToShow}/>
					: <FontAwesomeIcon className={'loading-icon'} icon={faSpinner}/>
			}

			<Pagination pageCount={pageCount}/>

			{alertInfoSelector.alertVisible && <CustomAlert/>}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		todosList: state.todos,
		activePageSelector: state.paginationInfo.activePage,
		itemsToShowCountSelector: state.filterData.itemsToShowCount,
		alertInfoSelector: state.alertInfo,
		activeCategorySelector: state.filterData.category.activeCategory,
		loadingSelector: state.loading,
		pagesToShowSelector: state.paginationInfo.pagesToShow
	}
}

const mapDispatchToProps = {
	changePagination,
	closeAlert,
	renderTodos,
	setActivePage,
	showAlert,
	toggleIsAllChecked,
	toggleLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
