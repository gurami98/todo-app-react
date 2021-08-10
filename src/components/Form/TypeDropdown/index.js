import { useRef, useState } from "react";
import './TypeDropdown.css'
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { useDispatch } from 'react-redux'
import { addType, chooseType, hideType, showType } from "../../../store/actionCreators";


const TypeDropdown = ({typeDropdown, myStorage}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const dispatch = useDispatch()
	const [typeDropdownInput, setTypeDropdownInput] = useState('')
	const showDropDown = (a) => {
		if (a.includes(typeDropdown.typeDropdownText)) {
			dispatch(showType())
			// setTypeDropdown({...typeDropdown, typeDropdownShow: !typeDropdown.typeDropdownShow})
		}
	}

	const chooseTypeDropdown = (e) => {
		dispatch(chooseType(e.target.innerHTML))
		// setTypeDropdown({
		// 	...typeDropdown,
		// 	typeDropdownText: e.target.innerHTML,
		// 	typeDropdownShow: !typeDropdown.typeDropdownShow
		// })
	}

	const handleInputChange = (e) => {
		setTypeDropdownInput(e.target.value)
	}

	const handleDropInputKeyPress = (e) => e.key === 'Enter' && handleAddType(e)

	const handleAddType = (e) => {
		e.preventDefault();
		if (typeDropdownInput.trim()) {
			setTypeDropdownInput('')
			dispatch(addType(typeDropdownInput))
			// setTypeDropdown({
			// 	...typeDropdown,
			// 	typeDropdownInput: '',
			// 	typeDropdownData: [...typeDropdown.typeDropdownData, typeDropdown.typeDropdownInput]
			// })
			myStorage.setItem('typeDropdownData', JSON.stringify([...typeDropdown.typeDropdownData, typeDropdownInput]))
		}
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target)  && dropdownItemsRef.current.classList.contains('show')) {
			let dropdownDataArr = [...JSON.parse(myStorage.getItem('typeDropdownData'))]
			dispatch(hideType(dropdownDataArr))
			setTypeDropdownInput('')
			// setTypeDropdown({
			// 	...typeDropdown,
			// 	typeDropdownData: [...JSON.parse(myStorage.getItem('typeDropdownData'))],
			// 	typeDropdownInput: '',
			// 	typeDropdownShow: false
			// })
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown">
			<label>To do for: </label>
			<CustomButton dropBtn={true} ref={dropdownBtn} onClick={(e) => showDropDown(typeDropdown.typeDropdownText)} className="dropbtn"
			        type="button">{typeDropdown.typeDropdownText} <span>▼</span></CustomButton>
			<CustomDropdown ref={dropdownItemsRef} show={typeDropdown.typeDropdownShow} className={typeDropdown.typeDropdownShow ? 'show' : ''}>
				<div className={"dropdown-items"}>
					{typeDropdown.typeDropdownData?.map(item => {
						return (
							<p onClick={chooseTypeDropdown} key={item}>{item}</p>
						)
					})}
				</div>
				<div className={"add-new-item"}>
					<input type="text" value={typeDropdownInput} onKeyDown={handleDropInputKeyPress}
					       onChange={(e) => handleInputChange(e)}/>
					<button type="button" autoFocus onClick={handleAddType}>Add</button>
				</div>
			</CustomDropdown>
		</div>
	)
}

export default TypeDropdown