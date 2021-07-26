import { useRef } from "react";


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
			<button ref={dropdownBtn} onClick={(e) => showDropDown(priorityDropdown.priorityDropdownText)}
			        className="dropbtn" type="button">{priorityDropdown.priorityDropdownText} <span>▼</span></button>
			<div ref={dropdownItemsRef}
			     className={priorityDropdown.priorityDropdownShow ? "dropdown-content show" : "dropdown-content"}>
				<div className={"dropdown-items"}>
					{priorityDropdown.priorityDropdownData.map(item => {
						return (
							<p onClick={chosePriority} key={item}>{item}</p>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default PriorityDropdown