import './App.css';
import './styles/shared/Dropdown.css'
import './styles/shared/CustomCheckbox.css'
import { useEffect, useState } from "react";
import TasksList from './components/TasksList'
import Form from './components/Form'
import Pagination from './components/Pagination'
import CustomAlert from "./components/CustomAlert";
import FilterComponent from "./components/FilterComponent";
import axios from "axios";

const App = () => {
	const [list, setList] = useState([])
	const [activePage, setActivePage] = useState(1)
	const [itemsToShow, setItemsToShow] = useState(8)

	const [alertInfo, setAlertInfo] = useState({alertText: '', alertVisible: false, alertType: ''})

	const allCategories = 'All Categories'
	const [activeCategory, setActiveCategory] = useState(allCategories)

	const myStorage = window.localStorage.getItem('typeDropdownData')
	if (!myStorage) window.localStorage.setItem('typeDropdownData', JSON.stringify(['University', 'Home', 'Work']))

	let listCount = list.length
	let pageCount = Math.ceil(listCount / itemsToShow) || 1
	const [paginationInfo, setPaginationInfo] = useState({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1}) // pagination

	const [checkedAll, setCheckedAll] = useState(false)

	let startIndex = (activePage - 1) * itemsToShow
	let endIndex = startIndex + itemsToShow
	let itemsArr = list.slice(startIndex, endIndex)

	useEffect(() => {
		getList()
	}, [])

	useEffect(()=>{
		setCheckedAll(list.every(item => item.done))
	}, [list])

	useEffect(() => {
			setPaginationInfo({
				...paginationInfo,
				pageNumbers: pageCount,
				endPage: pageCount,
				startPage: pageCount > 5 ? pageCount - 4 : 1
			})
			setActivePage(pageCount)
	}, [itemsToShow])

	useEffect(() => {
		let listCount = list.length
		let pageCount = Math.ceil(listCount / itemsToShow)
		setPaginationInfo({
			...paginationInfo,
			endPage: pageCount,
			startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow + 1 : 1
		})
	}, [list.length])

	const getList = async () => {
		try {
			const response = await fetch('http://localhost:3001/todo/get-all')
			const data = await response.json()
			setList(data)
			listCount = data.length
			pageCount = Math.ceil(listCount / itemsToShow)
			setPaginationInfo({
				...paginationInfo,
				endPage: pageCount < 7 ? pageCount : 5,
				startPage: 1
			})
		} catch (e) {
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
			closeAlert()
		}
	}

	const closeAlert = () => {
		setTimeout(() => {
			setAlertInfo({...alertInfo, alertVisible: false})
		}, 3000)
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

	const submitHandler = async(listData) => {
		try {
			const resp = await axios.post('http://localhost:3001/todo/add', listData)
			setList([...list, resp.data])
			setAlertInfo({...alertInfo, alertVisible: true, alertText: 'Item Successfully Added', alertType: 'success'})
			listCount = [...list, resp.data].length
			pageCount = Math.ceil(listCount / itemsToShow)
			setActivePage(pageCount)
		} catch (e) {
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
		}
		closeAlert()
	}

	const tickHandler = async () => {
		setCheckedAll(!checkedAll)
		try {
			await axios.put(`http://localhost:3001/todo/update-item/all`, {done: !checkedAll})
		} catch (e) {
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
			closeAlert()
		}
		let newArr = [...list]
		newArr = newArr.map(item => {
			item.done = !checkedAll
			return item
		})
		setList(newArr)
	}

	const deleteSelectedHandler = async () => {
		try {
			await axios.delete(`http://localhost:3001/todo/delete-item/selected`)
			setAlertInfo({...alertInfo, alertVisible: true, alertText: 'Items Succesfully Removed', alertType: 'success'})
			closeAlert()
		} catch (e) {
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
			closeAlert()
		}
		let newArr = [...list]
		newArr = newArr.filter(item => {
			return !item.done
		})
		setList(newArr)
		listCount = newArr.length
		pageCount = Math.ceil(listCount / itemsToShow)
		setActivePage(pageCount)
	}

	const editItemHandler = async (index, editText) => {
		try {
			await axios.put(`http://localhost:3001/todo/update-item/${index}`, {text: editText})
			setAlertInfo({...alertInfo, alertVisible: true, alertText: 'Item Successfully Edited', alertType: 'success'})
			closeAlert()
		}catch (e){
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
			closeAlert()
		}

		let newArr = [...list]
		newArr = newArr.map(item => {
			if (item._id === index) item.text = editText
			return item
		})
		setList(newArr)
	}

	const markAsDoneDB = async (e, index) => {
		try {
			await axios.put(`http://localhost:3001/todo/update-item/${index}`, {done: e.target.checked})
		}catch(e){
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
			closeAlert()
		}
	}

	const markAsDoneHandler = (e, index) => {
		markAsDoneDB(e, index)
		setList([...list].map(item => item._id === index ? {...item, done: e.target.checked} : item))
	}

	const deleteItemHandler = async (index) => {
		let newArr = [...list]
		newArr = newArr.filter(item => {
			return item._id !== index
		})
		try{
			await axios.delete(`http://localhost:3001/todo/delete-item/${index}`)
			setAlertInfo({...alertInfo, alertVisible: true, alertText: 'Item Succesfully Removed', alertType: 'success'})
			closeAlert()
		}catch(e){
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
			closeAlert()
		}

		setList(newArr)
		setActivePage(activePage)
	}

	let isAnyItemChecked = false;
	list.forEach(item => {
		if (item.done) isAnyItemChecked = true
	})

	return (
		<div className="App">
			<FilterComponent  isAnyItemChecked={isAnyItemChecked} tickHandler={tickHandler} deleteSelectedHandler={deleteSelectedHandler}  checkedAl={checkedAll}
			                 itemsToShow={itemsToShow} setItemsToShow={setItemsToShow} setList={setList} setActiveCategory={setActiveCategory}/>

			<Form submitHandler={submitHandler}/>

			<TasksList editItemHandler={editItemHandler} deleteItemHandler={deleteItemHandler} markAsDoneHandler={markAsDoneHandler}
			           allCategories={allCategories} activeCategory={activeCategory} itemsArr={itemsArr}/>

			<Pagination paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
			            pageCount={pageCount} activePage={activePage} setActive={setActivePage}
			            changePage={changePage}/>

			{alertInfo.alertVisible && <CustomAlert {...alertInfo}/>}
		</div>
	);
}

export default App;
