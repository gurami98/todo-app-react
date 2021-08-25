import {useRef, useState} from "react";
import './CategoryDropdown.css'
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { connect } from 'react-redux'
import {chooseCategory, addCategory} from "../../../store/actionCreators";
import * as todoSelectors from "../../../selectors/todoSelectors";

const CategoryDropdown = ({categoryDropdown, myStorage, addCategory, chooseCategory}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const [categoryDropdownInput, setCategoryDropdownInput] = useState('')
	const [categoryDropdownShow, setCategoryDropdownShow] = useState(false)

	const showDropDown = (a) => {
		if (a.includes(categoryDropdown.currentChoice)) {
			setCategoryDropdownShow(!categoryDropdownShow)
		}
	}

	const chooseCategoryDropdown = (e) => {
		chooseCategory(e.target.innerHTML)
		setCategoryDropdownShow(false)
	}

	const handleInputChange = (e) => {
		setCategoryDropdownInput(e.target.value)
	}

	const handleDropInputKeyPress = (e) => e.key === 'Enter' && handleAddType(e)

	const handleAddType = (e) => {
		e.preventDefault();
		if (categoryDropdownInput.trim()) {
			setCategoryDropdownInput('')
			addCategory(categoryDropdownInput)
			myStorage.setItem('categoryDropdownData', JSON.stringify([...categoryDropdown.options, categoryDropdownInput]))
		}
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target)  && dropdownItemsRef.current.classList.contains('show')) {
			setCategoryDropdownShow(false)
			setCategoryDropdownInput('')
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<div className="dropdown">
			<label>To do for: </label>
			<CustomButton dropBtn={true} ref={dropdownBtn} onClick={(e) => showDropDown(categoryDropdown.currentChoice)} className="dropbtn"
			        type="button">{categoryDropdown.currentChoice} <span>▼</span></CustomButton>
			<CustomDropdown ref={dropdownItemsRef} show={categoryDropdownShow} className={categoryDropdownShow ? 'show' : ''}>
				<div className={"dropdown-items"}>
					{categoryDropdown.options?.map(item => {
						return (
							<p onClick={chooseCategoryDropdown} key={item}>{item}</p>
						)
					})}
				</div>
				<div className={"add-new-item"}>
					<input type="text" value={categoryDropdownInput} onKeyDown={handleDropInputKeyPress}
					       onChange={(e) => handleInputChange(e)}/>
					<button type="button" autoFocus onClick={handleAddType}>Add</button>
				</div>
			</CustomDropdown>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		categoryDropdown: todoSelectors.getCategoryDropdown(state)
	}
}

const mapDispatchToProps = {
	chooseCategory,
	addCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)