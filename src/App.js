import './App.css';
import './styles/shared/shared.css'
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
	toggleLoading
} from "./store/actionCreators";
import * as todoSelectors from './selectors/todoSelectors'

const App = ({
	             //state
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
	             toggleLoading,
				 pageCount
             }) => {

	const myStorage = window.localStorage.getItem('categoryDropdownData')
	if (!myStorage) window.localStorage.setItem('categoryDropdownData', JSON.stringify(['University', 'Home', 'Work']))

	useEffect(() => {
		getList()
		changePagination({
			endPage: pageCount < 7 ? pageCount : 5,
			startPage: 1
		})
	}, [])

	useState(() => {
		setActivePage(1)
	}, [activeCategorySelector])

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
			setActivePage(1)
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	return (
		<div className="App">
			<FilterComponent alertHandler={alertHandler}/>

			<Form alertHandler={alertHandler}/>

			{
				!loadingSelector ?
					<TasksList alertHandler={alertHandler}/>
					: <FontAwesomeIcon className={'loading-icon'} icon={faSpinner}/>
			}

			<Pagination/>

			{alertInfoSelector.alertVisible && <CustomAlert/>}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		itemsToShowCountSelector: todoSelectors.getItemsToShowCount(state),
		alertInfoSelector: todoSelectors.getAlertInfo(state),
		activeCategorySelector: todoSelectors.getActiveCategory(state),
		loadingSelector: todoSelectors.getLoadingStatus(state),
		pagesToShowSelector: todoSelectors.getPagesToShow(state),
		pageCount: todoSelectors.getPageCount(state)
	}
}

const mapDispatchToProps = {
	changePagination,
	closeAlert,
	renderTodos,
	setActivePage,
	showAlert,
	toggleLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
