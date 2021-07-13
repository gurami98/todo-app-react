import styled from "styled-components";
import {useRef, useState } from "react";

const StyledForm = styled.form`
	width: 522px;
  display: flex;
  flex-direction: column;
	flex-wrap: wrap;
  border-radius: 3px;	
	align-content: space-between;
	justify-content: flex-start;
	align-items: flex-start;
	background-color: #EBEBEB;
	
	@media (max-width: 800px){
		flex-direction: column;
    width: 382px;
		justify-content: space-around;
	}
	@media (max-width: 450px){
		width: 90%;
	}
`

const Input = styled.input`
  text-indent: 5px;
  border-radius: 5px;
	width: 90%;
  height: 25px;
  outline: none;
	border: 0;
	box-sizing: border-box;
  background-color: transparent;
	&::placeholder{
		color: white;
		font-size: 16px;
	}
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
	color: #2794BD;
  background-color: #F6F4F4;
	margin-left: 30px;
  @media (max-width: 800px){
	  margin-left: 0;
  }
`

const Wrapper = styled.div`
	flex-direction: column;
  padding: 10px 10px 10px 50px;
	width: 100%;
	box-sizing: border-box;
	align-items: flex-start;
  min-height: 90px;
  justify-content: space-around;
	display: ${props => props.visible ? `flex;` : `none;`};

  @media (max-width: 800px){
		&{
			padding: 10px;
			gap: 5px;
		}
	  & .row1{
		  flex-direction: column;
		  gap: 5px;
	  }
    & .row2{
      flex-direction: column;
	    gap: 5px;
    }
  }
	
	& label{
		color: #999999;
	}
`

const Form = ({text, setText, handleSubmit, typeDropdown, setTypeDropdown, priorityDropdown, setPriorityDropdown, dueDate, setDueDate}) => {
	const dropdownItemsRef = useRef(null)
	const dropdownBtn = useRef(null)
	const dropdownItemsRef2 = useRef(null)
	const dropdownBtn2 = useRef(null)
	const formRef = useRef(null)

	const [wrapperVisible, setWrapperVisible] = useState(false)

	const myStorage = window.localStorage



	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (dropdownItemsRef.current && !dropdownBtn.current.contains(e.target) && !dropdownItemsRef.current.contains(e.target) && dropdownItemsRef.current.classList.contains('show')) {
			setTypeDropdown({...typeDropdown, typeDropdownData: [...JSON.parse(myStorage.getItem('typeDropdownData'))], typeDropdownInput: '',  typeDropdownShow: false})
		}
		if (dropdownItemsRef2.current && !dropdownBtn2.current.contains(e.target) && !dropdownItemsRef2.current.contains(e.target) && dropdownItemsRef2.current.classList.contains('show')) {
			setPriorityDropdown({...priorityDropdown, priorityDropdownShow: false})
		}
		if (!formRef.current?.contains(e.target)) {
			setWrapperVisible(false)
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

	const showDropDown = (a) => {
		if(a.includes(typeDropdown.typeDropdownText)) {
			setTypeDropdown({...typeDropdown, typeDropdownShow: !typeDropdown.typeDropdownShow})
		}
		else{
			setPriorityDropdown({...priorityDropdown, priorityDropdownShow: !priorityDropdown.priorityDropdownShow})
		}
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

	const choseType = (e) => {
		setTypeDropdown({...typeDropdown, typeDropdownText: e.target.innerHTML, typeDropdownShow: !typeDropdown.typeDropdownShow})
	}

	const chosePriority = (e) => {
		setPriorityDropdown({...priorityDropdown, priorityDropdownText: e.target.innerHTML, priorityDropdownShow: !priorityDropdown.priorityDropdownShow})
	}

	const handleDate = (e) => {
		setDueDate(e.target.value)
	}

	const handleToggle = () => {
		setWrapperVisible(!wrapperVisible)
	}

	return (
		<StyledForm ref={formRef}>
			<div className="input-container">
				<label onClick={handleToggle}>+</label>
				<Input onFocus={()=>setWrapperVisible(true)} id='add-item' placeholder='Add a task' autoFocus type="text" value={text} onChange={e => setText(e.target.value)} onKeyDown={handleFormInputKeyPress}/>
			</div>
			<Wrapper visible={wrapperVisible}>
				<div className="row1">
					<div className="dropdown">
						<label>To do for: </label>
						<button ref={dropdownBtn} onClick={(e)=> showDropDown(typeDropdown.typeDropdownText)} className="dropbtn" type="button">{typeDropdown.typeDropdownText} <span>▼</span> </button>
						<div ref={dropdownItemsRef} className={typeDropdown.typeDropdownShow ? "dropdown-content show" : "dropdown-content"}>
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
					<div>
						<label htmlFor="due-date">Due:</label>
						<input value={dueDate} onChange={(e) => handleDate(e)} type="date" id="due-date" name="due-date"/>
					</div>
				</div>

				<div className="row2">
					<div className="dropdown second">
						<label>Priority: </label>
						<button ref={dropdownBtn2} onClick={(e)=> showDropDown(priorityDropdown.priorityDropdownText)} className="dropbtn" type="button">{priorityDropdown.priorityDropdownText} <span>▼</span> </button>
						<div ref={dropdownItemsRef2} className={priorityDropdown.priorityDropdownShow ? "dropdown-content show" : "dropdown-content"}>
							<div className={"dropdown-items"}>
								{priorityDropdown.priorityDropdownData.map(item => {
									return(
										<p onClick={chosePriority} key={item}>{item}</p>
									)
								})}
							</div>
						</div>
					</div>
					<Button type='button' onClick={handleFormInput}>
						Add Task
					</Button>
				</div>


			</Wrapper>
		</StyledForm>
	)
}

export default Form;