import { GrSort } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { useRef, useState } from "react";
import './FilterDropdown.css';
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { connect } from 'react-redux'
import {chooseFilter, filterTodos} from "../../../store/actionCreators";
import {getFilterDropdown} from "../../../selectors/todoSelectors";

const FilterDropdown = ({
	                        filterDropdownSelector,
	                        chooseFilter,
	                        filterTodos,
                        }) => {
	const filterDropdownBtn = useRef(null)
	const filterDropdownItemsRef = useRef(null)
	const [filterDropdownShow, setFilterDropdownShow] = useState(false)

	const showFilterDropDown = (e) => {
		e.preventDefault();
		setFilterDropdownShow(!filterDropdownShow)
	}

	const choseFilterType = (e) => {
		chooseFilter(e)
		filterTodos(e)
		setFilterDropdownShow(false)
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (filterDropdownItemsRef.current && !filterDropdownBtn.current.contains(e.target) && !filterDropdownItemsRef.current.contains(e.target) && filterDropdownItemsRef.current.classList.contains('show')) {
			setFilterDropdownShow(false)
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown">
			<CustomButton filterBtn={true} ref={filterDropdownBtn} onClick={showFilterDropDown} className="dropbtn"
			              type="button">
				<GrSort/>{filterDropdownSelector.currentChoice} <span><MdArrowDropDown/></span>
			</CustomButton>
			<CustomDropdown ref={filterDropdownItemsRef} show={filterDropdownShow}
			                className={filterDropdownShow ? 'show' : ''}>
				<div className={"dropdown-items"}>
					{filterDropdownSelector?.options?.map(item => {
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
		filterDropdownSelector: getFilterDropdown(state)
	}
}

const mapDispatchToProps = {
		filterTodos,
		chooseFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropdown);