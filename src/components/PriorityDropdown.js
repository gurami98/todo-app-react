import { useRef } from "react";


const PriorityDropdown = ({priorityDropdown, setPriorityDropdown}) => {
	const dropdownItemsRef2 = useRef(null)
	const dropdownBtn2 = useRef(null)
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
		console.log("type click outside")
		document.removeEventListener("mousedown", handleClickOutside);
			if (dropdownItemsRef2.current && !dropdownBtn2.current.contains(e.target) && !dropdownItemsRef2.current.contains(e.target) && dropdownItemsRef2.current.classList.contains('show')) {
				setPriorityDropdown({...priorityDropdown, priorityDropdownShow: false})
			}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown second">
			<label>Priority: </label>
			<button ref={dropdownBtn2} onClick={(e) => showDropDown(priorityDropdown.priorityDropdownText)}
			        className="dropbtn" type="button">{priorityDropdown.priorityDropdownText} <span>▼</span></button>
			<div ref={dropdownItemsRef2}
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