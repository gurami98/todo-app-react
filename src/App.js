import './App.css';
import { useEffect, useState } from "react";
import List from './components/List'
import Form from './components/Form'
import Pagination from './components/Pagination'
import Dropdown from './components/Dropdown'

const App = () => {
	const [list, setList] = useState([])
	const [activePage, setActive] = useState(1)
	const [itemsToShow, setItemsToShow] = useState(8)

	const [paginationInfo, setPaginationInfo] = useState({pageNumbers: 1, pagesToShow: 5, endPage: 5, startPage: 1})

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
			if (listCount === 0)  setPaginationInfo({...paginationInfo, pageNumbers: [1]})
			else if (listCount % itemsToShow === 1) {
				setActive(pageCount)
				if (pageCount > paginationInfo.endPage) {
					setPaginationInfo({
						...paginationInfo,
						endPage: pageCount,
						startPage: pageCount - paginationInfo.pagesToShow + 1,
						pageNumbers: pageCount
					})
				}
			}
			setActive(pageCount)
		} else alert('Enter an item')
	}

	const changePage = (page) => {
		setActive(page)
		if (page <= paginationInfo.pagesToShow) {
			setPaginationInfo({...paginationInfo, endPage: paginationInfo.pagesToShow, startPage: 1})
		} else if (page >= paginationInfo.pageNumbers - paginationInfo.pagesToShow + 1) {
			setPaginationInfo({...paginationInfo, endPage: paginationInfo.pageNumbers, startPage: paginationInfo.pageNumbers - paginationInfo.pagesToShow + 1})
		} else {
			setPaginationInfo({...paginationInfo, endPage: page + 2, startPage: page - 2})
		}
	}

	const tick = () => {
		setCheckedAll(!checkedAll)
		setList([...list].map(item => ({...item, done: !checkedAll})))
	}

	const deleteSelected = () => {
		let noneChecked = true
		let newArr = []
		if(list.length){
			newArr = [...list]
			newArr = newArr.filter(item => {
				if(item.done) noneChecked = false;
				return !item.done
			})
			listCount = newArr.length
			pageCount = Math.ceil(listCount / itemsToShow)
			setList(newArr)
		}else alert('There are no items')

		if(noneChecked && list.length) alert('No items selected')
		else if(!pageCount) {
			setPaginationInfo({...paginationInfo, pageNumbers: 1})
			setActive(1)
		}else{
			setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
			setActive(pageCount)
		}
	}

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
				<button onClick={()=>deleteSelected()}>Delete Selected</button>
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
