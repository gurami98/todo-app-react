import { useRef } from "react";
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as actionCreators from "../../../store/actionCreators";

const PriorityDropdown = ({priorityDropdown, choosePriority, hidePriority, showPriority}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const showDropDown = (a) => {
		if (a.includes(priorityDropdown.priorityDropdownText)) {
			showPriority()
		}
	}

	const choosePriorityDropdown = (e) => {
		choosePriority(e.target.innerHTML)
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
			if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target) && dropdownItemsRef.current.classList.contains('show')) {
				hidePriority()
			}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown second">
			<label>Priority: </label>
			<CustomButton dropBtn={true} ref={dropdownBtn} onClick={(e) => showDropDown(priorityDropdown.priorityDropdownText)}
			        className="dropbtn" type="button">{priorityDropdown.priorityDropdownText} <span>▼</span>
			</CustomButton>
			<CustomDropdown ref={dropdownItemsRef} show={priorityDropdown.priorityDropdownShow} className={priorityDropdown.priorityDropdownShow ? 'show' : ''}>
				<div className={"dropdown-items"}>
					{priorityDropdown.priorityDropdownData?.map(item => {
						return (
							<p onClick={choosePriorityDropdown} key={item}>{item}</p>
						)
					})}
				</div>
			</CustomDropdown>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		priorityDropdown: state.priorityDropdown,
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

export default connect(mapStateToProps, mapDispatchToProps)(PriorityDropdown)