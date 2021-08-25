import {useRef, useState} from "react";
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { connect } from 'react-redux'
import {choosePriority} from "../../../store/actionCreators";
import * as todoSelectors from "../../../selectors/todoSelectors";

const PriorityDropdown = ({priorityDropdown, choosePriority}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const [priorityDropdownShow, setPriorityDropdownShow] = useState(false)

	const showDropDown = (a) => {
		if (a.includes(priorityDropdown.currentChoice)) {
			setPriorityDropdownShow(!priorityDropdownShow)
		}
	}

	const choosePriorityDropdown = (e) => {
		choosePriority(e.target.innerHTML)
		setPriorityDropdownShow(false)
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
			if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target) && dropdownItemsRef.current.classList.contains('show')) {
				setPriorityDropdownShow(false)
			}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown second">
			<label>Priority: </label>
			<CustomButton dropBtn={true} ref={dropdownBtn} onClick={(e) => showDropDown(priorityDropdown.currentChoice)}
			        className="dropbtn" type="button">{priorityDropdown.currentChoice} <span>▼</span>
			</CustomButton>
			<CustomDropdown ref={dropdownItemsRef} show={priorityDropdownShow} className={priorityDropdownShow ? 'show' : ''}>
				<div className={"dropdown-items"}>
					{priorityDropdown.options?.map(item => {
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
		priorityDropdown: todoSelectors.getPriorityDropdown(state),
	}
}

const mapDispatchToProps = {
	choosePriority
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityDropdown)