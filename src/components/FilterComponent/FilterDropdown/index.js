import { GrSort } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { useRef, useState } from "react";
import './FilterDropdown.css';
import CustomDropdownContainer from "../../UIKITS/CustomDropdownContainer";
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { connect } from 'react-redux'
import {chooseFilter, filterTodos} from "../../../store/actionCreators";
import {getFilterDropdown} from "../../../selectors/todoSelectors";

const FilterDropdown = ({
							filterDropdown,
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
		if (filterDropdownItemsRef.current && !filterDropdownBtn.current.contains(e.target) && !filterDropdownItemsRef.current.contains(e.target) && filterDropdownShow) {
			setFilterDropdownShow(false)
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<CustomDropdownContainer>
			<CustomButton filterBtn={true} ref={filterDropdownBtn} onClick={showFilterDropDown} className="dropbtn"
			              type="button">
				<GrSort/>{filterDropdown.currentChoice} <span><MdArrowDropDown/></span>
			</CustomButton>
			<CustomDropdown ref={filterDropdownItemsRef} show={filterDropdownShow}>
				<div>
					{filterDropdown?.options?.map(item => {
						return (
							<p onClick={(e) => choseFilterType(e.target.innerHTML)} key={item}>{item}</p>
						)
					})}
				</div>
			</CustomDropdown>
		</CustomDropdownContainer>
	)
}

const mapStateToProps = (state) => {
	return {
		filterDropdown: getFilterDropdown(state)
	}
}

const mapDispatchToProps = {
		filterTodos,
		chooseFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropdown);