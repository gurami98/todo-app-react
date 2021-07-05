import './App.css';
import styled from "styled-components";
import { useEffect, useState } from "react";
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

	const [paginationInfo, setPaginationInfo] = useState({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1})

	const [checkedAll, setCheckedAll] = useState(false)

	let listCount = list.length
	let pageCount = Math.ceil(listCount / itemsToShow)

	let startIndex = (activePage - 1) * itemsToShow
	let endIndex = startIndex + itemsToShow
	let itemsArr = list.slice(startIndex, endIndex)

	useEffect(() => {
		let counter = 0;
		list.forEach(item => {
			if(!item.done) setCheckedAll(false)
			else counter++
		})
		if(counter === list.length && counter > 0) setCheckedAll(true)
	}, [list])

	const handleSubmit = (text) => {
		let newArr = [...list, {text, done: false, id: new Date().getTime()}]
		if (text.trim()) {
			setList(newArr)
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
		} else alert('Enter an item')
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

	return (
		<div className="App">
			<Form handleSubmit={handleSubmit}/>
			<Dropdown  paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
								listCount={listCount} pageCount={pageCount}
			           setActive={setActive} itemsToShow={itemsToShow}
			          setItemsToShow={setItemsToShow}/>

			<div id="checker">
				<input disabled={!listCount} type="checkbox" id="select-all" name="select-all" checked={checkedAll} onChange={() => tick()}/>
				<label htmlFor="select-all">Select All</label>
				<Button disabled={!isAnyItemChecked} onClick={()=>deleteSelected()}>Delete Selected</Button>
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
