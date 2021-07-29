import './App.css';
import './styles/shared/Dropdown.css'
import './styles/shared/CustomCheckbox.css'
import { useEffect, useState } from "react";
import TasksList from './components/TasksList/TasksList.js'
import Form from './components/Form/Form.js'
import Pagination from './components/Pagination/Pagination.js'
import CustomAlert from "./components/CustomAlert/CustomAlert";
import FilterComponent from "./components/FilterComponent/FilterComponent";
import axios from "axios";

const defaultCategory = 'All Categories'
const App = () => {
	const [list, setList] = useState([])
	const [activePage, setActivePage] = useState(1)
	const [itemsToShowCount, setItemsToShowCount] = useState(8)
	const [alertInfo, setAlertInfo] = useState({alertText: '', alertVisible: false, alertType: ''})
	const [activeCategory, setActiveCategory] = useState(defaultCategory)
	const [paginationInfo, setPaginationInfo] = useState({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1})
	const [isAllChecked, setIsAllChecked] = useState(false)

	const myStorage = window.localStorage.getItem('typeDropdownData')
	if (!myStorage) window.localStorage.setItem('typeDropdownData', JSON.stringify(['University', 'Home', 'Work']))

	let startIndex = (activePage - 1) * itemsToShowCount
	let endIndex = startIndex + itemsToShowCount

	let filteredArrByCategory = list.filter(item => (item.taskType === activeCategory || activeCategory === defaultCategory) && item)
	let itemsToShow = filteredArrByCategory.slice(startIndex, endIndex)

	let listCount = filteredArrByCategory.length
	let pageCount = Math.ceil(listCount / itemsToShowCount) || 1

	useEffect(() => {
		getList()
	}, [])

	useEffect(()=>{
		setIsAllChecked(list.every(item => item.done))
	}, [list])

	useState(() => {
		setActivePage(1)
	}, [activeCategory])

	useEffect(() => {
			setPaginationInfo({
				...paginationInfo,
				pageNumbers: pageCount,
				endPage: pageCount,
				startPage: pageCount > 5 ? pageCount - 4 : 1
			})
			setActivePage(pageCount)
	}, [itemsToShowCount])

	useEffect(() => {
		let listCount = filteredArrByCategory.length
		let pageCount = Math.ceil(listCount / itemsToShowCount)
		setPaginationInfo({
			...paginationInfo,
			endPage: pageCount,
			startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow  : 1
		})
	}, [listCount])

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
			setList(data)
			listCount = data.length
			pageCount = Math.ceil(listCount / itemsToShowCount)
			setPaginationInfo({
				...paginationInfo,
				endPage: pageCount < 7 ? pageCount : 5,
				startPage: 1
			})
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

	const submitHandler = async(listData) => {
		try {
			const resp = await axios.post('http://localhost:3001/todo/add', listData)
			setList([...list, resp.data])
			alertHandler('Item Successfully Added', 'success')
			listCount++
			pageCount = Math.ceil(listCount / itemsToShowCount)
			setActivePage(pageCount)
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const selectAllHandler = async () => {
		setIsAllChecked(!isAllChecked)
		try {
			await axios.put(`http://localhost:3001/todo/update-item/all`, {done: !isAllChecked})
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
		setList(list.map(item =>( {
			...item,
			done: !isAllChecked,
		})))
	}

	const deleteSelectedHandler = async () => {
		try {
			await axios.delete(`http://localhost:3001/todo/delete-item/selected`)
			alertHandler('Items Successfully Removed', 'success')
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
		let newArr = list.filter(item => !item.done)
		setList(newArr)
		listCount = newArr.length
		pageCount = Math.ceil(listCount / itemsToShowCount)
		setActivePage(pageCount)
	}

	const editItemHandler = async (index, params) => {
		try {
			await axios.put(`http://localhost:3001/todo/update-item/${index}`, {...params})
			alertHandler('Item Successfully Edited', 'success')
			setList(list.map(item => item._id === index ? {...item, ...params} : item))
		}catch (e){
			alertHandler(e.response.data.message, 'error')
		}
	}

	const deleteItemHandler = async (index) => {
		try{
			await axios.delete(`http://localhost:3001/todo/delete-item/${index}`)
			let newArr = list.filter(item => item._id !== index)
			setList(newArr)
			setActivePage(activePage)
			alertHandler('Item Successfully Removed', 'success')
		}catch(e){
			alertHandler(e.response.data.message, 'error')
		}
	}

	let isAnyItemChecked = list.some(item => item.done)

	const getTempList = () => [...list]
	const setTempList = (tempArr) => setList(tempArr)

	const choseFilterType = (e) => {
		let tempArr = getTempList()
		setFilterDropdown({
			...filterDropdown,
			filterDropdownShow: !filterDropdown.filterDropdownShow,
			filterDropdownText: e.target.innerHTML
		})
		switch (e.target.innerHTML) {
			case filterData.az:
				tempArr.sort((a, b) => a.text.localeCompare(b.text))
				setTempList(tempArr)
				break;
			case filterData.za:
				tempArr.sort((a, b) => b.text.localeCompare(a.text))
				setTempList(tempArr)
				break;
			case filterData.oldest:
				tempArr.sort((a, b) => new Date(a.timeAdded) - new Date(b.timeAdded))
				setTempList(tempArr)
				break;
			case filterData.newest:
				tempArr.sort((a, b) => new Date(b.timeAdded) - new Date(a.timeAdded))
				setTempList(tempArr)
				break;
			case filterData.dueAsc:
				tempArr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
				setTempList(tempArr)
				break;
			case filterData.dueDesc:
				tempArr.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
				setTempList(tempArr)
				break;
			case filterData.prioAsc:
				tempArr.sort((a, b) => a.priority - b.priority)
				setTempList(tempArr)
				break;
			case filterData.prioDesc:
				tempArr.sort((a, b) => b.priority - a.priority)
				setTempList(tempArr)
				break;
			default:
				break;
		}
	}

	return (
		<div className="App">
			<FilterComponent choseFilterType={choseFilterType}
																				getTempList={getTempList} setTempList={setTempList} isAnyItemChecked={isAnyItemChecked} selectAllHandler={selectAllHandler}
			                 deleteSelectedHandler={deleteSelectedHandler}  isAllChecked={isAllChecked} itemsToShowCount={itemsToShowCount}
			                 setItemsToShowCount={setItemsToShowCount} setActiveCategory={setActiveCategory}/>

			<Form submitHandler={submitHandler}/>

			<TasksList editItemHandler={editItemHandler} deleteItemHandler={deleteItemHandler} itemsToShow={itemsToShow}/>

			<Pagination paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo} changePage={changePage}
			            pageCount={pageCount} activePage={activePage} setActivePage={setActivePage}/>

			{alertInfo.alertVisible && <CustomAlert {...alertInfo}/>}
		</div>
	);
}

export default App;
