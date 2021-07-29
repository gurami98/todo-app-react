import { GrSort } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { useRef, useState } from "react";
import './FilterDropdown.css'
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";

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

const FilterDropdown = ({getTempList, setTempList}) => {
	const filterDropdownBtn = useRef(null)
	const filterDropdownItemsRef = useRef(null)

	const [filterDropdown, setFilterDropdown] = useState({
		filterDropdownShow: false,
		filterDropdownData: [filterData.az, filterData.za, filterData.oldest, filterData.newest, filterData.dueAsc,
			filterData.dueDesc, filterData.prioAsc, filterData.prioDesc],
		filterDropdownText: defaultFilterText
	})

	const showFilterDropDown = (e) => {
		e.preventDefault();
		setFilterDropdown({...filterDropdown, filterDropdownShow: !filterDropdown.filterDropdownShow})
	}

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

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (filterDropdownItemsRef.current && !filterDropdownBtn.current.contains(e.target) && !filterDropdownItemsRef.current.contains(e.target) && filterDropdownItemsRef.current.classList.contains('show')) {
			setFilterDropdown({...filterDropdown, filterDropdownShow: false})
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown">
			<CustomButton filterBtn={true} ref={filterDropdownBtn} onClick={showFilterDropDown} className="dropbtn" type="button">
				<GrSort/>{filterDropdown.filterDropdownText} <span><MdArrowDropDown/></span>
			</CustomButton>
			<CustomDropdown ref={filterDropdownItemsRef} show={filterDropdown.filterDropdownShow} className={filterDropdown.filterDropdownShow ? 'show' : ''}>
				<div className={"dropdown-items"}>
					{filterDropdown.filterDropdownData.map(item => {
						return (
							<p onClick={(e) => choseFilterType(e)} key={item}>{item}</p>
						)
					})}
				</div>
			</CustomDropdown>
		</div>
	)
}

export default FilterDropdown