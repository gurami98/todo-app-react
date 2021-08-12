import { GrSort } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { useRef } from "react";
import './FilterDropdown.css';
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as actionCreators from "../../../store/actionCreators";

const FilterDropdown = ({
	                        filterDropdownSelector,
	                        chooseFilter,
	                        filterTodos,
	                        hideFilter,
	                        showFilter
                        }) => {
	const filterDropdownBtn = useRef(null)
	const filterDropdownItemsRef = useRef(null)

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
	return {
		...bindActionCreators({
			...actionCreators
		}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropdown);