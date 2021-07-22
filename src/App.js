import './App.css';
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import TasksList from './components/TasksList'
import Form from './components/Form'
import Pagination from './components/Pagination'
import Dropdown from './components/Dropdown'
import Categories from './components/Categories'
import CustomAlert from "./components/CustomAlert";
import { MdArrowDropDown } from 'react-icons/md';
import { GrSort } from 'react-icons/gr';

import axios from 'axios';
import { logDOM } from "@testing-library/react";


const Button = styled.button`
  &:hover {
    opacity: 0.7;
  }

  cursor: pointer;
  vertical-align: super;
  color: #EB8383;
  background-color: #F6F4F4;
  border: 0;
  font-size: 14px;
  border-radius: 5px;
  width: 120px;
  height: 100%;
  ${props => props.disabled &&
          `color: #a2a199;
				  background-color: #F6F4F4;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
  }
`

const App = () => {
	let currentDate = new Date().toJSON().slice(0, 10)
	const [list, setList] = useState([])
	const [activePage, setActive] = useState(1)
	const [itemsToShow, setItemsToShow] = useState(8)
	const [dueDate, setDueDate] = useState(currentDate)
	const filterDropdownItemsRef = useRef(null)
	const filterDropdownBtn = useRef(null)
	const [text, setText] = useState('')

	const [alertText, setAlertText] = useState('')
	const [alertVisible, setAlertVisible] = useState(false)
	const [alertType, setAlertType] = useState('');

	const allCategories = 'All Categories'
	const [activeCategory, setActiveCategory] = useState(allCategories)

	const myStorage = window.localStorage

	if (!myStorage.length) myStorage.setItem('typeDropdownData', JSON.stringify(['University', 'Home', 'Work']))

	const error = 'error'
	const success = 'success'

	const filterData = {
		az: 'A-Z',
		za: 'Z-A',
		oldest: 'Oldest First',
		newest: 'Newest First',
		dueAsc: 'Due Ascending',
		dueDesc: 'Due Descending',
		prioAsc: 'Priority Asc',
		prioDesc: 'Priority Desc',
	}

	let defaultFilterText = 'Sort By'
	const [filterDropdown, setFilterDropdown] = useState({
		filterDropdownShow: false,
		filterDropdownData: [filterData.az, filterData.za, filterData.oldest, filterData.newest, filterData.dueAsc,
			filterData.dueDesc, filterData.prioAsc, filterData.prioDesc],
		filterDropdownText: defaultFilterText
	})
	let defaultTypeText = 'University'
	const [typeDropdown, setTypeDropdown] = useState({
		typeDropdownShow: false,
		typeDropdownData: [...JSON.parse(myStorage.getItem('typeDropdownData'))],
		typeDropdownInput: '',
		typeDropdownText: defaultTypeText
	})

	let defaultPriorityText = 'Medium'
	const [priorityDropdown, setPriorityDropdown] = useState({
		priorityDropdownShow: false,
		priorityDropdownData: ['Low', 'Medium', 'High'],
		priorityDropdownDataNumbers: [1, 2, 3],
		priorityDropdownText: defaultPriorityText
	})
	let listCount = list.length
	let pageCount = Math.ceil(listCount / itemsToShow)
	const [paginationInfo, setPaginationInfo] = useState({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1})

	const [checkedAll, setCheckedAll] = useState(false)

	let startIndex = (activePage - 1) * itemsToShow
	let endIndex = startIndex + itemsToShow
	let itemsArr = list.slice(startIndex, endIndex)



	const getList = async () => {
		try {
			const response = await fetch('http://localhost:3001/todo/get-all')
			const data = await response.json()
			setList(data)
		} catch (e) {
			throw new Error(e)
		}
	}

	const showFilterDropDown = (e) => {
		e.preventDefault();
		setFilterDropdown({...filterDropdown, filterDropdownShow: !filterDropdown.filterDropdownShow})
	}

	const choseFilterType = (e) => {
		let tempArr = [...list]
		setFilterDropdown({
			...filterDropdown,
			filterDropdownShow: !filterDropdown.filterDropdownShow,
			filterDropdownText: e.target.innerHTML
		})
		switch (e.target.innerHTML) {
			case filterData.az:
				tempArr = tempArr.sort((a, b) => a.text.localeCompare(b.text))
				setList(tempArr)
				break;
			case filterData.za:
				tempArr = tempArr.sort((a, b) => b.text.localeCompare(a.text))
				setList(tempArr)
				break;
			case filterData.oldest:
				tempArr = tempArr.sort((a, b) => new Date(a.timeAdded) - new Date(b.timeAdded))
				setList(tempArr)
				break;
			case filterData.newest:
				tempArr = tempArr.sort((a, b) => new Date(b.timeAdded) - new Date(a.timeAdded))
				setList(tempArr)
				break;
			case filterData.dueAsc:
				tempArr = tempArr.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
				setList(tempArr)
				break;
			case filterData.dueDesc:
				tempArr = tempArr.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
				setList(tempArr)
				break;
			case filterData.prioAsc:
				tempArr = tempArr.sort((a, b) => a.priority - b.priority)
				setList(tempArr)
				break;
			case filterData.prioDesc:
				tempArr = tempArr.sort((a, b) => b.priority - a.priority)
				setList(tempArr)
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		getList()
	}, [])

	useEffect(() => {
		let lastPage = pageCount > 6 ? 5: pageCount
		setPaginationInfo({...paginationInfo, pageNumbers: pageCount, endPage: lastPage })
		let counter = 0;
		list.forEach(item => {
			if (!item.done) setCheckedAll(false)
			else counter++
		})
		if (counter === list.length && counter > 0) setCheckedAll(true)
	}, [list])

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (filterDropdownItemsRef.current && !filterDropdownBtn.current.contains(e.target) && !filterDropdownItemsRef.current.contains(e.target) && filterDropdownItemsRef.current.classList.contains('show')) {
			setFilterDropdown({...filterDropdown, filterDropdownShow: false})
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	const addData = async (data) => {
		try {
			await axios.post('http://localhost:3001/todo/add', data)
			setAlertVisible(true)
			setAlertText("Item Succesfully Added!")
			setAlertType(success)
			getList()
			return true
		}
		catch (e) {
			setAlertVisible(true)
			setAlertText(e.response.data.message)
			setAlertType(error)
			return false
		}
	}

	const handleSubmit = (text) => {
		if (text.trim() && dueDate.trim()) {
			let dateAdded = new Date()
			let priorityIndex = priorityDropdown.priorityDropdownData.indexOf(priorityDropdown.priorityDropdownText)

			let listData = {
				text, taskType: typeDropdown.typeDropdownText, dueDate, timeAdded: dateAdded,
				priority: priorityDropdown.priorityDropdownDataNumbers[priorityIndex], done: false
			}

			addData(listData).then((result)=> {
				if (result){
					let newArr = [...list, listData]
					setTypeDropdown({...typeDropdown, typeDropdownText: defaultTypeText})
					setPriorityDropdown({...priorityDropdown, priorityDropdownText: defaultPriorityText})
					setDueDate(currentDate)
					let listCount = newArr.length
					let pageCount = Math.ceil(listCount / itemsToShow)
					if (!listCount) setPaginationInfo({...paginationInfo, pageNumbers: 1})
					else if (listCount % itemsToShow === 1) {
						setActive(pageCount)
						if (pageCount > paginationInfo.endPage) {
							setPaginationInfo({
								...paginationInfo,
								endPage: pageCount,
								startPage: pageCount - paginationInfo.pagesToShow + 1,
								pageNumbers: pageCount
							})
						} else {
							setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
						}
					}
					setActive(pageCount)
					setPaginationInfo({
						...paginationInfo,
						endPage: pageCount,
						startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow + 1 : 1
					})
				}
			})
			setText('')
		} else alert('Enter every value needed in form')
	}

	const changePage = (page) => {
		setActive(page)
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

	const tick = () => {
		setCheckedAll(!checkedAll)
		setList([...list].map(item => ({...item, done: !checkedAll})))
	}

	const deleteMethod = async (id) => {
		await axios.delete(`http://localhost:3001/todo/delete-item/${id}`)
	}

	const deleteSelected = async () => {
		await list.forEach(item => item.done && deleteMethod(item._id))
		let newArr = [...list]
		newArr = newArr.filter(item => {
			return !item.done
		})
		setList(newArr)
		listCount = newArr.length
		pageCount = Math.ceil(listCount / itemsToShow)

		if (pageCount > activePage) {
			setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
		} else if (!pageCount) {
			setPaginationInfo({...paginationInfo, pageNumbers: 1})
			setActive(1)
		} else {
			setActive(pageCount)
			setPaginationInfo({
				...paginationInfo,
				pageNumbers: pageCount,
				endPage: pageCount,
				startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow + 1 : 1
			})
		}
	}

	let isAnyItemChecked = false;
	list.forEach(item => {
		if (item.done) isAnyItemChecked = true
	})

	useEffect(() => {
		setTimeout(() => {
			setAlertVisible(false)
		}, 3000)
	}, [alertVisible])

	return (
		<div className="App">
			<div id="checker">
				<div className='select-delete-main-container'>
					<div className="round">
						<input type="checkbox" id="select-all" name="select-all" checked={checkedAll} readOnly/>
						<label htmlFor="checkbox" onClick={tick}/>
						<span>Select All</span>
					</div>
					<div className="delete-selected-btn-container">
						<Button disabled={!isAnyItemChecked} onClick={deleteSelected}>Delete Selected</Button>
					</div>
				</div>

				<Dropdown paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
				          listCount={listCount} pageCount={pageCount}
				          setActive={setActive} itemsToShow={itemsToShow}
				          setItemsToShow={setItemsToShow}/>

				<div className="dropdown">
					<button ref={filterDropdownBtn} onClick={showFilterDropDown} className="dropbtn" type="button">
						<GrSort/>{filterDropdown.filterDropdownText} <span><MdArrowDropDown/></span></button>
					<div ref={filterDropdownItemsRef}
					     className={filterDropdown.filterDropdownShow ? "dropdown-content show" : "dropdown-content"}>
						<div className={"dropdown-items"}>
							{filterDropdown.filterDropdownData.map(item => {
								return (
									<p onClick={(e) => choseFilterType(e)} key={item}>{item}</p>
								)
							})}
						</div>
					</div>
				</div>
			</div>


			<Categories setActiveCategory={setActiveCategory} typeDropdown={typeDropdown}/>

			<Form handleSubmit={handleSubmit}
			      currentDate={currentDate}
			      text={text} setText={setText}
			      dueDate={dueDate} setDueDate={setDueDate}
			      typeDropdown={typeDropdown} setTypeDropdown={setTypeDropdown}
			      priorityDropdown={priorityDropdown} setPriorityDropdown={setPriorityDropdown}/>


			<TasksList allCategories={allCategories} activeCategory={activeCategory}
			           paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
			           activePage={activePage} setActive={setActive}
			           list={list} setList={setList} itemsToShow={itemsToShow} itemsArr={itemsArr}/>

			<Pagination paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
			            pageCount={pageCount} activePage={activePage} setActive={setActive}
			            changePage={changePage}/>

			{alertVisible && <CustomAlert alertText={alertText} alertType={alertType}/>}
		</div>
	);
}

export default App;
