import { GrSort } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useRef } from "react";
import './FilterDropdown.css';
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { filterData } from '..';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as actionCreators from "../../../store/actionCreators";

let defaultFilterText = 'Sort By'

const FilterDropdown = ({
	                        filterDropdownSelector,
	                        chooseFilter,
	                        filterTodos,
	                        hideFilter,
	                        renderFilterDropdown,
	                        showFilter
                        }) => {
	const filterDropdownBtn = useRef(null)
	const filterDropdownItemsRef = useRef(null)

	useEffect(() => {
		renderFilterDropdown({
			filterDropdownShow: false,
			filterDropdownData: [filterData.az, filterData.za, filterData.oldest, filterData.newest, filterData.dueAsc,
				filterData.dueDesc, filterData.prioAsc, filterData.prioDesc],
			filterDropdownText: defaultFilterText
		})
	}, [])

	const showFilterDropDown = (e) => {
		e.preventDefault();
		showFilter()
	}

	const choseFilterType = (e) => {
		chooseFilter(e)
		filterTodos(e)
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (filterDropdownItemsRef.current && !filterDropdownBtn.current.contains(e.target) && !filterDropdownItemsRef.current.contains(e.target) && filterDropdownItemsRef.current.classList.contains('show')) {
			hideFilter()
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown">
			<CustomButton filterBtn={true} ref={filterDropdownBtn} onClick={showFilterDropDown} className="dropbtn"
			              type="button">
				<GrSort/>{filterDropdownSelector.filterDropdownText} <span><MdArrowDropDown/></span>
			</CustomButton>
			<CustomDropdown ref={filterDropdownItemsRef} show={filterDropdownSelector.filterDropdownShow}
			                className={filterDropdownSelector.filterDropdownShow ? 'show' : ''}>
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

const mapStateToProps = (state) => {
	return {
		filterDropdownSelector: state.filterDropdown
	}
}

const mapDispatchToProps = (dispatch) => {
	const boundActionCreators = bindActionCreators({
		...actionCreators
	}, dispatch)
	return {
		...boundActionCreators
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropdown);