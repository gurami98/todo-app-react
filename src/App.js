import './App.css';
import './styles/shared/Dropdown.css'
import './styles/shared/CustomCheckbox.css'
import { useEffect, useState } from "react";
import TasksList from './components/TasksList'
import Form from './components/Form'
import Pagination from './components/Pagination'
import CustomAlert from "./components/CustomAlert";
import FilterComponent, { filterData } from "./components/FilterComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import {
	addTodo,
	deleteSelected,
	deleteTodo,
	filterTodos,
	markAllDone,
	markDone,
	renderTodos
} from "./store/actionCreators";

const defaultCategory = 'All Categories'

const App = () => {
	const todosList = useSelector(({todos}) => todos)
	const dispatch = useDispatch()
	const [activePage, setActivePage] = useState(1)
	const [itemsToShowCount, setItemsToShowCount] = useState(8)
	const [alertInfo, setAlertInfo] = useState({alertText: '', alertVisible: false, alertType: ''})
	const [activeCategory, setActiveCategory] = useState(defaultCategory)
	const [paginationInfo, setPaginationInfo] = useState({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1})
	const [isAllChecked, setIsAllChecked] = useState(false)
	const [Loading, setLoading] = useState(true)

	const myStorage = window.localStorage.getItem('typeDropdownData')
	if (!myStorage) window.localStorage.setItem('typeDropdownData', JSON.stringify(['University', 'Home', 'Work']))

	let startIndex = (activePage - 1) * itemsToShowCount
	let endIndex = startIndex + itemsToShowCount

	let filteredArrByCategory = todosList.filter(item => (item.taskType === activeCategory || activeCategory === defaultCategory) && item)
	let itemsToShow = filteredArrByCategory.slice(startIndex, endIndex)


	let listCount = filteredArrByCategory.length
	let pageCount = Math.ceil(listCount / itemsToShowCount) || 1

	useEffect(() => {
		getList()
	}, [])

	useEffect(() => {
		setIsAllChecked(todosList.every(item => item.done))
	}, [todosList])

	useState(() => {
		setActivePage(1)
	}, [activeCategory])

	useEffect(() => {
		let listCount = filteredArrByCategory.length
		let pageCount = Math.ceil(listCount / itemsToShowCount)
		setPaginationInfo({
			...paginationInfo,
			pageNumbers: pageCount,
			startPage: activePage >= pageCount - 4 ? pageCount - 4 : activePage <= 5 ? 1 : activePage - 2,
			endPage: activePage >= pageCount - 5 ? pageCount : activePage <= 5 ? 5 : activePage + 2,
		})
		// setActivePage(pageCount)
	}, [listCount])

	useEffect(() => {
		setPaginationInfo({
			...paginationInfo,
			pageNumbers: pageCount,
			startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow + 1 : 1,
			endPage: pageCount,
		})
		setActivePage(pageCount)
	}, [itemsToShowCount])

	const alertHandler = (alertText, alertType) => {
		setAlertInfo({...alertInfo, alertVisible: true, alertText, alertType})
		setTimeout(() => {
			setAlertInfo({...alertInfo, alertVisible: false})
		}, 3000)
	}

	const getList = async () => {
		try {
			const response = await fetch('http://localhost:3001/todo/get-all')
			const data = await response.json()
			setLoading(false)
			dispatch(renderTodos(data))
			listCount = data.length
			pageCount = Math.ceil(listCount / itemsToShowCount)
			setPaginationInfo({
				...paginationInfo,
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
		if (pageCount >= paginationInfo.pagesToShow) {
			if (page <= paginationInfo.pagesToShow) {
				setPaginationInfo({...paginationInfo, endPage: paginationInfo.pagesToShow, startPage: 1})
			} else if (page >= pageCount - paginationInfo.pagesToShow + 1) {
				setPaginationInfo({
					...paginationInfo,
					endPage: pageCount,
					startPage: pageCount - paginationInfo.pagesToShow + 1
				})
			} else {
				setPaginationInfo({...paginationInfo, endPage: page + 2, startPage: page - 2})
			}
		}
	}

	const submitHandler = async (listData) => {
		try {
			const resp = await axios.post('http://localhost:3001/todo/add', listData)
			dispatch(addTodo(resp.data))
			alertHandler('Item Successfully Added', 'success')
			listCount++
			pageCount = Math.ceil(listCount / itemsToShowCount)
			setActivePage(pageCount)
			setPaginationInfo({
				...paginationInfo,
				pageNumbers: pageCount,
				startPage: pageCount > 6 ? pageCount - 4 : 1,
				endPage: pageCount,
			})
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const selectAllHandler = async () => {
		setIsAllChecked(!isAllChecked)
		try {
			await axios.put(`http://localhost:3001/todo/update-item/all`, {done: !isAllChecked})
			dispatch(markAllDone(!isAllChecked))
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const deleteSelectedHandler = async () => {
		try {
			await axios.delete(`http://localhost:3001/todo/delete-item/selected`)
			alertHandler('Items Successfully Removed', 'success')
			dispatch(deleteSelected())
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
		let newArr = todosList.filter(item => !item.done) // needs to be fixed ? ?
		listCount = newArr.length
		pageCount = Math.ceil(listCount / itemsToShowCount)
		setActivePage((pageCount >= activePage && pageCount > 0) ? activePage : pageCount === 0 ? 1 : pageCount)
		setPaginationInfo({
			...paginationInfo,
			pageNumbers: pageCount,
			startPage: activePage >= pageCount - 4 ? pageCount - 4 : activePage <= 5 ? 1 : activePage - 2,
			endPage: activePage >= pageCount - 5 ? pageCount : activePage <= 5 ? 5 : activePage + 2,
		})
	}

	const editItemHandler = async (index, params) => {
		try {
			await axios.put(`http://localhost:3001/todo/update-item/${index}`, {...params})
			alertHandler('Item Successfully Edited', 'success')
			dispatch(markDone(index, params))
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const deleteItemHandler = async (index) => {
		try {
			await axios.delete(`http://localhost:3001/todo/delete-item/${index}`)
			dispatch(deleteTodo(index))
			let newArr = todosList.filter(item => item._id !== index) // do I still need it ?
			listCount = newArr.length
			pageCount = Math.ceil(listCount / itemsToShowCount)
			setActivePage(activePage > pageCount ? pageCount : activePage)
			setPaginationInfo({
				...paginationInfo,
				pageNumbers: pageCount,
				startPage: activePage >= pageCount - 4 ? pageCount - 4 : activePage <= 5 ? 1 : activePage - 2,
				endPage: activePage >= pageCount - 5 ? pageCount : activePage <= 5 ? 5 : activePage + 2,
			})
			alertHandler('Item Successfully Removed', 'success')
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	let isAnyItemChecked = todosList.some(item => item.done)

	const filterHandler = (e) => dispatch(filterTodos(e))

	return (
		<div className="App">
			<FilterComponent
				filterHandler={filterHandler}
				isAnyItemChecked={isAnyItemChecked}
				selectAllHandler={selectAllHandler}
				deleteSelectedHandler={deleteSelectedHandler}
				isAllChecked={isAllChecked}
				itemsToShowCount={itemsToShowCount}
				setItemsToShowCount={setItemsToShowCount} setActiveCategory={setActiveCategory}/>

			<Form submitHandler={submitHandler}/>

			{
				!Loading ? <TasksList
						editItemHandler={editItemHandler}
						deleteItemHandler={deleteItemHandler}
						itemsToShow={itemsToShow}/> :
					<FontAwesomeIcon className={'loading-icon'} icon={faSpinner}/>
			}

			<Pagination paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo} changePage={changePage}
			            pageCount={pageCount} activePage={activePage} setActivePage={setActivePage}/>

			{alertInfo.alertVisible && <CustomAlert {...alertInfo}/>}
		</div>
	);
}

export default App;
