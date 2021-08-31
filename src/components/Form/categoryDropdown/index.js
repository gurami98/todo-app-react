import {useRef, useState} from "react";
import './CategoryDropdown.css'
import CustomDropdownContainer from "../../UIKITS/CustomDropdownContainer";
import CustomButton from "../../UIKITS/CustomButton";
import CustomDropdown from "../../UIKITS/CustomDropdown";
import { connect } from 'react-redux'
import {chooseCategory, addCategory} from "../../../store/actionCreators";
import * as todoSelectors from "../../../selectors/todoSelectors";
import {addCategoryItem} from "../../../API/categoryAPI";
import * as userSelectors from "../../../selectors/userSelectors";

const CategoryDropdown = ({categoryDropdown, username, addCategory, chooseCategory}) => {
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

	const handleAddType = async (e) => {
		e.preventDefault();
		if (categoryDropdownInput.trim()) {
			addCategory(categoryDropdownInput)
			await addCategoryItem({category: categoryDropdownInput, user: username})
			setCategoryDropdownInput('')
		}
	}

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target) && categoryDropdownShow) {
			setCategoryDropdownShow(false)
			setCategoryDropdownInput('')
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	return (
		<CustomDropdownContainer>
			<label>To do for: </label>
			<CustomButton dropBtn={true} ref={dropdownBtn} onClick={(e) => showDropDown(categoryDropdown.currentChoice)} className="dropbtn"
			        type="button">{categoryDropdown.currentChoice} <span>▼</span></CustomButton>
			<CustomDropdown ref={dropdownItemsRef} show={categoryDropdownShow}>
				<div>
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
		</CustomDropdownContainer>
	)
}

const mapStateToProps = (state) => {
	return {
		categoryDropdown: todoSelectors.getCategoryDropdown(state),
		username: userSelectors.getCurrentUsername(state)
	}
}

const mapDispatchToProps = {
	chooseCategory,
	addCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown)