import { useRef, useState } from "react";
import './TypeDropdown.css'
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as actionCreators from "../../../store/actionCreators";


const TypeDropdown = ({typeDropdown, myStorage, addType, chooseType, hideType, showType}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const [typeDropdownInput, setTypeDropdownInput] = useState('')
	const showDropDown = (a) => {
		if (a.includes(typeDropdown.typeDropdownText)) {
			showType()
		}
	}

	const chooseTypeDropdown = (e) => {
		chooseType(e.target.innerHTML)
	}

	const handleInputChange = (e) => {
		setTypeDropdownInput(e.target.value)
	}

	const handleDropInputKeyPress = (e) => e.key === 'Enter' && handleAddType(e)

	const handleAddType = (e) => {
		e.preventDefault();
		if (typeDropdownInput.trim()) {
			setTypeDropdownInput('')
			addType(typeDropdownInput)
			myStorage.setItem('typeDropdownData', JSON.stringify([...typeDropdown.typeDropdownData, typeDropdownInput]))
		}
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target)  && dropdownItemsRef.current.classList.contains('show')) {
			let dropdownDataArr = [...JSON.parse(myStorage.getItem('typeDropdownData'))]
			hideType(dropdownDataArr)
			setTypeDropdownInput('')
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

const mapStateToProps = (state) => {
	return {
		typeDropdown: state.typeDropdown
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

export default connect(mapStateToProps, mapDispatchToProps)(TypeDropdown)