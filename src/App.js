import './App.css';
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
import Cookies from 'js-cookie'
import {
	changePagination,
	renderTodos,
	setActivePage,
	toggleLoading
} from "./store/actionCreators";
import * as todoSelectors from './selectors/todoSelectors'
import alertHandler from "./helpers/alertHelper";
import * as userSelectors from "./selectors/userSelectors";

const App = ({
	             //state
				 userName,
				 itemsToShowCount,
				 alertInfo,
				 activeCategory,
				 loading,
				 pagesToShow,
	             // actions
	             changePagination,
	             renderTodos,
	             setActivePage,
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
	}, [userName])

	useState(() => {
		setActivePage(1)
	}, [activeCategory])

	useEffect(() => {
		changePagination({
			pageNumbers: pageCount,
			startPage: pageCount > 5 ? pageCount - pagesToShow + 1 : 1,
			endPage: pageCount,
		})
		setActivePage(pageCount)
	}, [itemsToShowCount])

	const getList = async () => {
		try {
			const token = Cookies.get('jwt')
			const response = await getAllTodoItems(token)
			const data = await response.data
			toggleLoading(false)
			renderTodos(data)
			setActivePage(1)
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	return (
		<div className="App">
			<FilterComponent/>

			<Form/>

			{
				!loading ?
					<TasksList/>
					: <FontAwesomeIcon className={'loading-icon'} icon={faSpinner}/>
			}

			<Pagination/>

			{alertInfo.alertVisible && <CustomAlert/>}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		itemsToShowCount: todoSelectors.getItemsToShowCount(state),
		alertInfo: todoSelectors.getAlertInfo(state),
		activeCategory: todoSelectors.getActiveCategory(state),
		loading: todoSelectors.getLoadingStatus(state),
		pagesToShow: todoSelectors.getPagesToShow(state),
		pageCount: todoSelectors.getPageCount(state),
		userName: userSelectors.getCurrentUsername(state)
	}
}

const mapDispatchToProps = {
	changePagination,
	renderTodos,
	setActivePage,
	toggleLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
