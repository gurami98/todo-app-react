import { GrSort } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import './FilterDropdown.css';
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import {filterData} from '..';
import { useSelector, useDispatch } from 'react-redux'
import { chooseFilter, hideFilter, renderFilterDropdown, showFilter } from "../../../store/actionCreators";

let defaultFilterText = 'Sort By'

const FilterDropdown = ({filterHandler}) => {
	const filterDropdownBtn = useRef(null)
	const filterDropdownItemsRef = useRef(null)

	const filterDropdownSelector = useSelector(({filterDropdown}) => filterDropdown)
	const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(renderFilterDropdown({
			filterDropdownShow: false,
			filterDropdownData: [filterData.az, filterData.za, filterData.oldest, filterData.newest, filterData.dueAsc,
				filterData.dueDesc, filterData.prioAsc, filterData.prioDesc],
			filterDropdownText: defaultFilterText
		}))
	}, [])

	const showFilterDropDown = (e) => {
		e.preventDefault();
		dispatch(showFilter())
	}

	const choseFilterType = (e) => {
		dispatch(chooseFilter(e))
		filterHandler(e)
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (filterDropdownItemsRef.current && !filterDropdownBtn.current.contains(e.target) && !filterDropdownItemsRef.current.contains(e.target) && filterDropdownItemsRef.current.classList.contains('show')) {
			dispatch(hideFilter())
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown">
			<CustomButton filterBtn={true} ref={filterDropdownBtn} onClick={showFilterDropDown} className="dropbtn" type="button">
				<GrSort/>{filterDropdownSelector.filterDropdownText} <span><MdArrowDropDown/></span>
			</CustomButton>
			<CustomDropdown ref={filterDropdownItemsRef} show={filterDropdownSelector.filterDropdownShow} className={filterDropdownSelector.filterDropdownShow ? 'show' : ''}>
				<div className={"dropdown-items"}>
					{filterDropdownSelector?.filterDropdownData?.map(item => {
						return (
							<p onClick={(e) => choseFilterType(e.target.innerHTML)} key={item}>{item}</p>
						)
					})}
				</div>
			</CustomDropdown>
		</div>
	)
}

export default FilterDropdown;