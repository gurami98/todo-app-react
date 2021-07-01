import './App.css';
import { useState } from "react";
import List from './components/List'
import Form from './components/Form'
import Pagination from './components/Pagination'
import Dropdown from './components/Dropdown'

const App = () => {
	const [list, setList] = useState([])
	const [activePage, setActive] = useState(1)
	const [itemsToShow, setItemsToShow] = useState(8)
	const [pageNumbers, setPageNumbers] = useState(1)

	const [pageNumberLimit, setPageNumberLimit] = useState(5)
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(1)

	let listCount = list.length
	let pageCount = Math.ceil(listCount / itemsToShow)

	let startIndex = (activePage - 1) * itemsToShow
	let endIndex = startIndex + itemsToShow
	let itemsArr = list.slice(startIndex, endIndex)


	const handleSubmit = (text) => {
		let newArr = [...list, {text, done: false, id: new Date().getTime()}]
		if (text.trim()) {
			setList(newArr)
			let listCount = newArr.length
			let pageCount = Math.ceil(listCount / itemsToShow)
			if (listCount === 0) setPageNumbers([1])
			else if (listCount % itemsToShow === 1) {
				setPageNumbers(pageCount)
				setActive(pageCount)
				if (pageCount > maxPageNumberLimit) {
					setMaxPageNumberLimit(pageCount)
					setMinPageNumberLimit(pageCount - pageNumberLimit + 1)
				}
			}
		} else alert('Enter an item')
	}

	const changePage = (page) => {
		setActive(page)
		if (page <= pageNumberLimit) {
			setMaxPageNumberLimit(pageNumberLimit)
			setMinPageNumberLimit(1)
		} else if (page >= pageNumbers - pageNumberLimit + 1) {
			setMaxPageNumberLimit(pageNumbers)
			setMinPageNumberLimit(pageNumbers - pageNumberLimit + 1)
		} else {
			setMaxPageNumberLimit(page + 2)
			setMinPageNumberLimit(page - 2)
		}
	}

	// add and delete handler functions for todo
	// edit item too

	return (
		<div className="App">
			<Form handleSubmit={handleSubmit}/>
			<Dropdown setPageNumberLimit={setPageNumberLimit} setMaxPageNumberLimit={setMaxPageNumberLimit}
			          setMinPageNumberLimit={setMinPageNumberLimit} listCount={listCount} pageCount={pageCount}
			          setPageNumbers={setPageNumbers} setActive={setActive} itemsToShow={itemsToShow}
			          setItemsToShow={setItemsToShow}/>



			<List activePage={activePage} pageNumbers={pageNumbers} setPageNumbers={setPageNumbers} setActive={setActive}
			      list={list} setList={setList} itemsToShow={itemsToShow} itemsArr={itemsArr}/>
			<Pagination pageNumberLimit={pageNumberLimit} setPageNumberLimit={setPageNumberLimit}
			            maxPageNumberLimit={maxPageNumberLimit} setMaxPageNumberLimit={setMaxPageNumberLimit}
			            minPageNumberLimit={minPageNumberLimit} setMinPageNumberLimit={setMinPageNumberLimit}
			            pageCount={pageCount} pageNumbers={pageNumbers} activePage={activePage} setActive={setActive}
			            changePage={changePage}/>
		</div>
);
}

export default App;
