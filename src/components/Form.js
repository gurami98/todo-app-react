import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const StyledForm = styled.form`
	width: 500px;
  display: flex;
  flex-direction: row;
	flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 3px;	
	height: 60px;
	align-content: space-between;
	justify-content: center;
	
	@media (max-width: 800px){
		flex-direction: column;
    min-height: 150px;
    width: 360px;
		justify-content: space-around;
	}
	@media (max-width: 450px){
		width: 85%;
	}
`

const Input = styled.input`
  text-indent: 5px;
  border-radius: 5px;
	width: 235px;
  height: 25px;
  outline: none;
  border: 1px solid gray;
	box-sizing: border-box;
  @media (max-width: 800px){
	  width: 100%;
    margin-right: 0;
  }
`

const Button = styled.button`
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
  border-radius: 5px;
  height: 25px;
  border: 0;
  color: white;
  background-color: #329ea8;
	margin-left: 30px;
  @media (max-width: 800px){
	  margin-left: 0;
  }
`

const Form = ({text, setText, handleSubmit, typeDropdown, setTypeDropdown, priorityDropdown, setPriorityDropdown, dueDate, setDueDate}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const dropdownItemsRef2 = useRef(null)
	const dropdownBtn2 = useRef(null)

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target) && dropdownItemsRef.current.classList.contains('show')) {
			setTypeDropdown({...typeDropdown, typeDropdownShow: false})
		}
		if (dropdownItemsRef2.current && !dropdownBtn2.current.contains(e.target) && !dropdownItemsRef2.current.contains(e.target) && dropdownItemsRef2.current.classList.contains('show')) {
			setPriorityDropdown({...priorityDropdown, priorityDropdownShow: false})
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	const handleFormInputKeyPress = (e) => {
		if (e.key === 'Enter') handleFormInput(e)
	}
	const handleFormInput = (e) => {
		handleSubmit(text)
		e.preventDefault()
	}

	const showDropDown = (e) => {
		e.preventDefault();
		if(e.target.innerHTML === typeDropdown.typeDropdownText) {
			setTypeDropdown({...typeDropdown, typeDropdownShow: !typeDropdown.typeDropdownShow})
		}else{
			setPriorityDropdown({...priorityDropdown, priorityDropdownShow: !priorityDropdown.priorityDropdownShow})
		}
	}

	const handleInputChange = (e) => {
		setTypeDropdown({...typeDropdown, typeDropdownInput: e.target.value})
	}

	const handleDropInputKeyPress = (e) => {
		if (e.key === 'Enter') handleAddType(e)
	}

	const handleAddType = (e) => {
		e.preventDefault();
		if (typeDropdown.typeDropdownInput.trim())
			setTypeDropdown({...typeDropdown, typeDropdownInput: '', typeDropdownData: [...typeDropdown.typeDropdownData, typeDropdown.typeDropdownInput]})
	}

	const choseType = (e) => {
		setTypeDropdown({...typeDropdown, typeDropdownText: e.target.innerHTML, typeDropdownShow: !typeDropdown.typeDropdownShow})
	}

	const chosePriority = (e) => {
		setPriorityDropdown({...priorityDropdown, priorityDropdownText: e.target.innerHTML, priorityDropdownShow: !priorityDropdown.priorityDropdownShow})
	}

	const handleDate = (e) => {
		setDueDate(e.target.value)
	}

	return (
		<StyledForm>
			<Input autoFocus type="text" value={text} onChange={e => setText(e.target.value)} onKeyDown={handleFormInputKeyPress} placeholder='New Todo'/>
			<div className="dropdown">
				<button ref={dropdownBtn} onClick={(e)=> showDropDown(e)} className="dropbtn" type="button">{typeDropdown.typeDropdownText}</button>
				<div id="myDropdown" ref={dropdownItemsRef} className={typeDropdown.typeDropdownShow ? "dropdown-content show" : "dropdown-content"}>
					<div className={"dropdown-items"}>
						{typeDropdown.typeDropdownData.map(item => {
							return(
								<p onClick={choseType} key={item}>{item}</p>
							)
						})}
					</div>
					<div className={"add-new-item"}>
						<input type="text" value={typeDropdown.typeDropdownInput} onKeyDown={handleDropInputKeyPress} onChange={(e)=> handleInputChange(e)}/>
						<button type="button" autoFocus  onClick={handleAddType}>Add</button>
					</div>
				</div>
			</div>

			<div className="dropdown second">
				<button ref={dropdownBtn2} onClick={(e)=> showDropDown(e)} className="dropbtn" type="button">{priorityDropdown.priorityDropdownText}</button>
				<div id="myDropdown" ref={dropdownItemsRef2} className={priorityDropdown.priorityDropdownShow ? "dropdown-content show" : "dropdown-content"}>
					<div className={"dropdown-items"}>
						{priorityDropdown.priorityDropdownData.map(item => {
							return(
								<p onClick={chosePriority} key={item}>{item}</p>
							)
						})}
					</div>
				</div>
			</div>
			<label htmlFor="due-date">Due Date:</label>
			<input value={dueDate} onChange={(e) => handleDate(e)} type="date" id="due-date" name="due-date"/>

			<Button type='button' onClick={handleFormInput}>
				Add Task
			</Button>
		</StyledForm>
	)
}

export default Form;