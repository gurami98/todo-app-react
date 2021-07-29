import { useRef } from "react";
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";

const PriorityDropdown = ({priorityDropdown, setPriorityDropdown}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const showDropDown = (a) => {
		if (a.includes(priorityDropdown.priorityDropdownText)) {
			setPriorityDropdown({...priorityDropdown, priorityDropdownShow: !priorityDropdown.priorityDropdownShow})
		}
	}

	const chosePriority = (e) => {
		setPriorityDropdown({
			...priorityDropdown,
			priorityDropdownText: e.target.innerHTML,
			priorityDropdownShow: !priorityDropdown.priorityDropdownShow
		})
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
			if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target) && dropdownItemsRef.current.classList.contains('show')) {
				setPriorityDropdown({...priorityDropdown, priorityDropdownShow: false})
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
					{priorityDropdown.priorityDropdownData.map(item => {
						return (
							<p onClick={chosePriority} key={item}>{item}</p>
						)
					})}
				</div>
			</CustomDropdown>
		</div>
	)
}

export default PriorityDropdown