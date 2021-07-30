import { GrSort } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { useRef, useState } from "react";
import './FilterDropdown.css'
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";

let defaultFilterText = 'Sort By'

const FilterDropdown = ({filterHandler, filterData}) => {
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
		setFilterDropdown({
			...filterDropdown,
			filterDropdownShow: !filterDropdown.filterDropdownShow,
			filterDropdownText: e
		})
		filterHandler(e)
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
							<p onClick={(e) => choseFilterType(e.target.innerHTML)} key={item}>{item}</p>
						)
					})}
				</div>
			</CustomDropdown>
		</div>
	)
}

export default FilterDropdown