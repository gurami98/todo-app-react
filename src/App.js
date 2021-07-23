import './App.css';
import { useEffect, useState } from "react";
import TasksList from './components/TasksList'
import Form from './components/Form'
import Pagination from './components/Pagination'
import ItemNumberDropdown from './components/ItemNumberDropdown'
import Categories from './components/Categories'
import CustomAlert from "./components/CustomAlert";
import DeleteSelectedBtn from "./components/DeleteSelectedBtn";
import FilterDropdown from "./components/FilterDropdown";

const defaultFormData = {
	defaultTypeText: 	'University',
	defaultPriorityText: 'Medium'
}

const App = () => {
	let currentDate = new Date().toJSON().slice(0, 10)
	const [list, setList] = useState([])
	const [activePage, setActive] = useState(1)
	const [itemsToShow, setItemsToShow] = useState(8)

	const [alertInfo, setAlertInfo] = useState({alertText: '', alertVisible: false, alertType: ''})

	const allCategories = 'All Categories'
	const [activeCategory, setActiveCategory] = useState(allCategories)

	const myStorage = window.localStorage
	if (!myStorage.length) myStorage.setItem('typeDropdownData', JSON.stringify(['University', 'Home', 'Work']))

	// this one is being used by Category component
	const [typeDropdown, setTypeDropdown] = useState({
		typeDropdownShow: false,
		typeDropdownData: [...JSON.parse(myStorage.getItem('typeDropdownData'))],
		typeDropdownInput: '',
		typeDropdownText: defaultFormData.defaultTypeText
	}) // form

	let listCount = list.length
	let pageCount = Math.ceil(listCount / itemsToShow)
	const [paginationInfo, setPaginationInfo] = useState({pageNumbers: 1, pagesToShow: 5, endPage: 1, startPage: 1}) // pagination

	const [checkedAll, setCheckedAll] = useState(false)

	let startIndex = (activePage - 1) * itemsToShow
	let endIndex = startIndex + itemsToShow
	let itemsArr = list.slice(startIndex, endIndex)

	useEffect(() => {
		getList()
	}, [])

	useEffect(() => {
		let lastPage = pageCount > 6 ? 5: pageCount
		setPaginationInfo({...paginationInfo, pageNumbers: pageCount, endPage: lastPage })
		setCheckedAll(list.every(item => item.done))
	}, [list])

	const getList = async () => {
		try {
			const response = await fetch('http://localhost:3001/todo/get-all')
			const data = await response.json()
			setList(data)
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

	return (
		<div className="App">
			<div id="checker">
				<DeleteSelectedBtn list={list} setList={setList} setCheckedAll={setCheckedAll} checkedAll={checkedAll}
				                   paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo} listCount={listCount}
				                   pageCount={pageCount} activePage={activePage} setActive={setActive} itemsToShow={itemsToShow}/>

				<ItemNumberDropdown paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
				                    listCount={listCount} pageCount={pageCount}
				                    setActive={setActive} itemsToShow={itemsToShow}
				                    setItemsToShow={setItemsToShow}/>

				<FilterDropdown list={list} setList={setList}/>
			</div>

			<Categories setActiveCategory={setActiveCategory} typeDropdown={typeDropdown}/>

			<Form defaultFormData={defaultFormData} setList={setList} list={list} alertInfo={alertInfo} setAlertInfo={setAlertInfo}
			      paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo} closeAlert={closeAlert}
			      currentDate={currentDate} typeDropdown={typeDropdown} setTypeDropdown={setTypeDropdown}
			      setActive={setActive} itemsToShow={itemsToShow}/>

			<TasksList allCategories={allCategories} activeCategory={activeCategory}
			           paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
			           activePage={activePage} setActive={setActive}
			           list={list} setList={setList} itemsToShow={itemsToShow} itemsArr={itemsArr}/>

			<Pagination paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
			            pageCount={pageCount} activePage={activePage} setActive={setActive}
			            changePage={changePage}/>

			{alertInfo.alertVisible && <CustomAlert {...alertInfo}/>}
		</div>
	);
}

export default App;
