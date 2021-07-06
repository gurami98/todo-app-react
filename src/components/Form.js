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
	
	@media (max-width: 800px){
		flex-direction: column;
    height: 70px;
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
	width: 300px;
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
`

const Form = ({handleSubmit, typeDropdown, setTypeDropdown, dueDate, setDueDate}) => {
	const [text, setText] = useState('')
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)

	useEffect(() => {
		let btnText = typeDropdown.typeDropdownText
		const handleClickOutside = (e) => {
			if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target) && dropdownItemsRef.current.classList.contains('show')) {
				// small bug, button text resets after clicking outside of button
				setTypeDropdown({...typeDropdown, typeDropdownText: btnText, typeDropdownShow: false})
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownItemsRef]);

	const handleFormInputKeyPress = (e) => {
		if (e.key === 'Enter') handleFormInput(e)
	}
	const handleFormInput = (e) => {
		handleSubmit(text)
		setText('')
		e.preventDefault()
	}

	const showDropDown = (e) => {
		e.preventDefault();
		setTypeDropdown({...typeDropdown, typeDropdownShow: !typeDropdown.typeDropdownShow})
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
		console.log(e.target.innerHTML)
		setTypeDropdown({...typeDropdown, typeDropdownText: e.target.innerHTML, typeDropdownShow: !typeDropdown.typeDropdownShow})
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
			<Button type='button' onClick={handleFormInput}>
				Add Task
			</Button>
			<label htmlFor="due-date">Due Date:</label>
			<input value={dueDate} onChange={(e) => handleDate(e)} type="date" id="due-date" name="due-date"/>
		</StyledForm>
	)
}

export default Form;