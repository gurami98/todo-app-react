import { useRef } from "react";
import '../../styles/TypeDropdown.css'
import CustomButton from "../UIKITS/CustomButton";


const TypeDropdown = ({setTypeDropdown, typeDropdown, myStorage}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const showDropDown = (a) => {
		if (a.includes(typeDropdown.typeDropdownText)) {
			setTypeDropdown({...typeDropdown, typeDropdownShow: !typeDropdown.typeDropdownShow})
		}
	}

	const choseType = (e) => {
		setTypeDropdown({
			...typeDropdown,
			typeDropdownText: e.target.innerHTML,
			typeDropdownShow: !typeDropdown.typeDropdownShow
		})
	}

	const handleInputChange = (e) => {
		setTypeDropdown({...typeDropdown, typeDropdownInput: e.target.value})
	}

	const handleDropInputKeyPress = (e) => e.key === 'Enter' && handleAddType(e)

	const handleAddType = (e) => {
		e.preventDefault();
		if (typeDropdown.typeDropdownInput.trim()) {
			setTypeDropdown({
				...typeDropdown,
				typeDropdownInput: '',
				typeDropdownData: [...typeDropdown.typeDropdownData, typeDropdown.typeDropdownInput]
			})
			myStorage.setItem('typeDropdownData', JSON.stringify([...typeDropdown.typeDropdownData, typeDropdown.typeDropdownInput]))
		}
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target) && dropdownItemsRef.current.classList.contains('show')) {
			setTypeDropdown({
				...typeDropdown,
				typeDropdownData: [...JSON.parse(myStorage.getItem('typeDropdownData'))],
				typeDropdownInput: '',
				typeDropdownShow: false
			})
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown">
			<label>To do for: </label>
			<CustomButton dropBtn={true} ref={dropdownBtn} onClick={(e) => showDropDown(typeDropdown.typeDropdownText)} className="dropbtn"
			        type="button">{typeDropdown.typeDropdownText} <span>▼</span></CustomButton>
			<div ref={dropdownItemsRef}
			     className={typeDropdown.typeDropdownShow ? "dropdown-content show" : "dropdown-content"}>
				<div className={"dropdown-items"}>
					{typeDropdown.typeDropdownData.map(item => {
						return (
							<p onClick={choseType} key={item}>{item}</p>
						)
					})}
				</div>
				<div className={"add-new-item"}>
					<input type="text" value={typeDropdown.typeDropdownInput} onKeyDown={handleDropInputKeyPress}
					       onChange={(e) => handleInputChange(e)}/>
					<button type="button" autoFocus onClick={handleAddType}>Add</button>
				</div>
			</div>
		</div>
	)
}

export default TypeDropdown