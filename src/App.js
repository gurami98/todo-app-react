import './App.css';
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import List from './components/List'
import Form from './components/Form'
import Pagination from './components/Pagination'
import Dropdown from './components/Dropdown'

const Button = styled.button`
	&:hover{
		opacity: 0.7;
	}
	cursor: pointer;
  vertical-align: super;
  background-color: #d9534f;
  color: white;
  border: 0;
  border-radius: 5px;
  width: 120px;
  height: 25px;
  ${props => props.disabled && 
				  `color: #a2a199;
		 background-color: #c7c1c1;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
  }
`

const App = () => {
	const [list, setList] = useState([])
	const [activePage, setActive] = useState(1)
	const [itemsToShow, setItemsToShow] = useState(8)
	const [dueDate, setDueDate] = useState('')
	const filterDropdownItemsRef = useRef(null)
	const filterDropdownBtn = useRef(null)
	const [text, setText] = useState('')
	//const [filterText, setFilterText] = useState('')

	const [paginationInfo, setPaginationInfo] = useState({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1})
	const [typeDropdown, setTypeDropdown] = useState(		{typeDropdownShow: false,
																																typeDropdownData: ['University', 'Home', 'Work'],
																																typeDropdownInput: '',
																																typeDropdownText: 'Task Type'})
	const [filterDropdown, setFilterDropdown] = useState({filterDropdownShow: false,
																																	filterDropdownData: ['A-Z', 'Z-A', 'Oldest First', 'Newest First', 'Due Ascending', 'Due Descending'],
																																	filterDropdownText: 'Sort By'})

	const [checkedAll, setCheckedAll] = useState(false)

	let listCount = list.length
	let pageCount = Math.ceil(listCount / itemsToShow)

	let startIndex = (activePage - 1) * itemsToShow
	let endIndex = startIndex + itemsToShow
	let itemsArr = list.slice(startIndex, endIndex)

	const showFilterDropDown = (e) => {
		e.preventDefault();
		console.log('test')
		setFilterDropdown({...filterDropdown, filterDropdownShow: !filterDropdown.filterDropdownShow})
	}

	const choseFilterType = (e) => {
		let tempArr = [...list]
		setFilterDropdown({...filterDropdown, filterDropdownShow: !filterDropdown.filterDropdownShow, filterDropdownText: e.target.innerHTML})
		switch(e.target.innerHTML) {
			case 'A-Z':
				tempArr = tempArr.sort((a, b) => a.text.localeCompare(b.text))
				setList(tempArr)
				break;
			case 'Z-A':
				tempArr = tempArr.sort((a, b) => b.text.localeCompare(a.text))
				setList(tempArr)
				break;
			case 'Newest First':
				tempArr = tempArr.sort((a,b) => new Date(b.timeAdded) - new Date(a.timeAdded))
				setList(tempArr)
				break;
			case 'Oldest First':
				tempArr = tempArr.sort((a,b) => new Date(a.timeAdded) - new Date(b.timeAdded))
				setList(tempArr)
				break;
			case 'Due Ascending':
				tempArr = tempArr.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
				setList(tempArr)
				break;
			case 'Due Descending':
				tempArr = tempArr.sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate))
				setList(tempArr)
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		let counter = 0;
		list.forEach(item => {
			if(!item.done) setCheckedAll(false)
			else counter++
		})
		if(counter === list.length && counter > 0) setCheckedAll(true)
	}, [list])

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (filterDropdownItemsRef.current && !filterDropdownBtn.current.contains(e.target) && !filterDropdownItemsRef.current.contains(e.target) && filterDropdownItemsRef.current.classList.contains('show')) {
			setFilterDropdown({...filterDropdown, filterDropdownShow: false})
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	const handleSubmit = (text) => {
		if (text.trim() && typeDropdown.typeDropdownText !== 'Task Type' && dueDate.trim()) {
			let d = new Date(),
				seconds = '' + d.getSeconds(),
				minutes = '' + d.getMinutes(),
				hours = '' + d.getHours(),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();
			if(seconds < 10) seconds = '0' + seconds
			if(minutes < 10) minutes = '0' + minutes
			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
			let dateAdded = [year, month, day].join(' ').concat(" ", [hours, minutes, seconds].join(':'));

			let newArr = [...list, {text, taskType: typeDropdown.typeDropdownText, dueDate, timeAdded: dateAdded, done: false, id: new Date().getTime()}]

			setList(newArr)
			setTypeDropdown({...typeDropdown, typeDropdownText: 'Task Type'})
			let listCount = newArr.length
			let pageCount = Math.ceil(listCount / itemsToShow)
			if (!listCount) setPaginationInfo({...paginationInfo, pageNumbers: [1]})
			else if (listCount % itemsToShow === 1) {
				setActive(pageCount)
				if (pageCount > paginationInfo.endPage) {
					setPaginationInfo({
						...paginationInfo,
						endPage: pageCount,
						startPage: pageCount - paginationInfo.pagesToShow + 1,
						pageNumbers: pageCount
					})
				}else{
					setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
				}
			}
			setActive(pageCount)
			setPaginationInfo({...paginationInfo, endPage: pageCount, startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow + 1 : 1})
			setText('')
		} else alert('Enter every value needed in form')
	}

	const changePage = (page) => {
		setActive(page)
		if (page <= paginationInfo.pagesToShow) {
			setPaginationInfo({...paginationInfo, endPage: paginationInfo.pagesToShow, startPage: 1})
		} else if (page >= pageCount - paginationInfo.pagesToShow + 1) {
			setPaginationInfo({...paginationInfo, endPage: pageCount, startPage: pageCount - paginationInfo.pagesToShow + 1})
		} else {
			setPaginationInfo({...paginationInfo, endPage: page + 2, startPage: page - 2})
		}
	}

	const tick = () => {
		setCheckedAll(!checkedAll)
		setList([...list].map(item => ({...item, done: !checkedAll})))
	}

	const deleteSelected = () => {
		let newArr = [...list]
		newArr = newArr.filter(item => {
			return !item.done
		})
		listCount = newArr.length
		pageCount = Math.ceil(listCount / itemsToShow)
		setList(newArr)

		if(pageCount > activePage){
			setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
		}
		else if (!pageCount) {
			setPaginationInfo({...paginationInfo, pageNumbers: 1})
			setActive(1)
		}
		else {
			setActive(pageCount)
			setPaginationInfo({...paginationInfo, pageNumbers: pageCount, endPage: pageCount, startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow + 1 : 1})
		}
	}

	let isAnyItemChecked = false;
	list.forEach(item => {
			if(item.done) isAnyItemChecked = true
	})

	// const handleFilterKeyPress = (e) => {
	// 	if (e.key === 'Enter') filterItems()
	// }
	//
	// const filterItems = () => {
	// 	console.log(filterText)
	// }

	return (
		<div className="App">
			<Form handleSubmit={handleSubmit} text={text} setText={setText} dueDate={dueDate} setDueDate={setDueDate} typeDropdown={typeDropdown} setTypeDropdown={setTypeDropdown}/>
			<Dropdown  paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
								listCount={listCount} pageCount={pageCount}
			           setActive={setActive} itemsToShow={itemsToShow}
			          setItemsToShow={setItemsToShow}/>

			<div id="checker">
				<input disabled={!listCount} type="checkbox" id="select-all" name="select-all" checked={checkedAll} onChange={() => tick()}/>
				<label htmlFor="select-all">Select All</label>
				<Button disabled={!isAnyItemChecked} onClick={()=>deleteSelected()}>Delete Selected</Button>
				{/*<label htmlFor="filter-items" id="filter-label">Filter</label>*/}
				{/*<input value={filterText} onChange={(e)=>setFilterText(e.target.value)} onKeyDown={handleFilterKeyPress} type="text" id="filter-items" name="filter-items"/>*/}
				{/*<button type="button" onClick={filterItems}>Filter</button>*/}
				<div className="dropdown">
					<button ref={filterDropdownBtn} onClick={(e)=> showFilterDropDown(e)} className="dropbtn" type="button">{filterDropdown.filterDropdownText}</button>
					<div id="myDropdown" ref={filterDropdownItemsRef} className={filterDropdown.filterDropdownShow ? "dropdown-content show" : "dropdown-content"}>
						<div className={"dropdown-items"}>
							{filterDropdown.filterDropdownData.map(item => {
								return(
									<p onClick={(e)=>choseFilterType(e)} key={item}>{item}</p>
								)
							})}
						</div>
					</div>
				</div>
			</div>

			<List paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
						activePage={activePage} setActive={setActive}
			      list={list} setList={setList} itemsToShow={itemsToShow} itemsArr={itemsArr}/>
			<Pagination paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
			            pageCount={pageCount} activePage={activePage} setActive={setActive}
			            changePage={changePage}/>
		</div>
);
}

export default App;
