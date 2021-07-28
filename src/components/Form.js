import styled from "styled-components";
import { useRef, useState } from "react";
import axios from "axios";
import TypeDropdown from "./TypeDropdown";
import PriorityDropdown from "./PriorityDropdown";
import '../styles/Form.css'

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

  @media (max-width: 800px) {
    flex-direction: column;
    width: 382px;
    justify-content: space-around;
  }
  @media (max-width: 450px) {
    width: 90%;
  }
`

const Input = styled.input`
  text-indent: 5px;
  border-radius: 5px;
  width: 75%;
  height: 25px;
  outline: none;
  border: 0;
  box-sizing: border-box;
  background-color: transparent;

  &::placeholder {
    color: white;
    font-size: 16px;
  }

  @media (max-width: 800px) {
    width: 60%;
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
  @media (max-width: 800px) {
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

  @media (max-width: 800px) {
    & {
      padding: 10px;
      gap: 5px;
    }

    & .row1 {
      flex-direction: column;
      gap: 5px;
    }

    & .row2 {
      flex-direction: column;
      gap: 5px;
    }
  }

  & label {
    color: #999999;
  }
`

const Form = ({submitHandler}) => {
	let currentDate = new Date().toJSON().slice(0, 10)

	const defaultFormData = {
		defaultTypeText: 'University',
		defaultPriorityText: 'Medium'
	}
	const [priorityDropdown, setPriorityDropdown] = useState({
		priorityDropdownShow: false,
		priorityDropdownData: ['Low', 'Medium', 'High'],
		priorityDropdownDataNumbers: [1, 2, 3],
		priorityDropdownText: defaultFormData.defaultPriorityText
	})

	const [typeDropdown, setTypeDropdown] = useState({
		typeDropdownShow: false,
		typeDropdownData: [...JSON.parse(window.localStorage.getItem('typeDropdownData'))],
		typeDropdownInput: '',
		typeDropdownText: defaultFormData.defaultTypeText
	})

	const formRef = useRef(null)

	const [dueDate, setDueDate] = useState(currentDate)
	const [text, setText] = useState('')

	const [wrapperVisible, setWrapperVisible] = useState(false)

	const myStorage = window.localStorage

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
		if (!formRef.current?.contains(e.target)) {
			setWrapperVisible(false)
		}
	}
	document.addEventListener("mousedown", handleClickOutside);

	const handleFormInputKeyPress = (e) => {
		if (e.key === 'Enter') handleSubmit(e, text)
	}

	const handleDate = (e) => {
		setDueDate(e.target.value)
	}

	const handleToggle = () => {
		setWrapperVisible(!wrapperVisible)
	}

	const handleSubmit = async (e, text) => {
		e.preventDefault()
		if (text.trim() && dueDate.trim()) {
			let dateAdded = new Date()
			let priorityIndex = priorityDropdown.priorityDropdownData.indexOf(priorityDropdown.priorityDropdownText)

			let listData = {
				text, taskType: typeDropdown.typeDropdownText, dueDate, timeAdded: dateAdded,
				priority: priorityDropdown.priorityDropdownDataNumbers[priorityIndex], done: false
			}
			submitHandler(listData)
			setTypeDropdown({...typeDropdown, typeDropdownText: defaultFormData.defaultTypeText})
			setPriorityDropdown({...priorityDropdown, priorityDropdownText: defaultFormData.defaultPriorityText})
			setDueDate(currentDate)
			setText('')
		} else alert('Enter every value needed in form')
	}

	return (
		<StyledForm ref={formRef} autoComplete="off">
			<div className="input-container">
				<label onClick={handleToggle}>+</label>
				<Input onFocus={() => setWrapperVisible(true)} id='add-item' placeholder='Add a task' autoFocus type="text"
				       value={text} onChange={e => setText(e.target.value)} onKeyDown={handleFormInputKeyPress}/>

				<Button type='button' onClick={(e) => handleSubmit(e, text)}>
					Add Task
				</Button>
			</div>
			<Wrapper visible={wrapperVisible}>
				<div className="row1">
					<TypeDropdown setTypeDropdown={setTypeDropdown} typeDropdown={typeDropdown} myStorage={myStorage}/>
				</div>

				<div className="row2">
					<PriorityDropdown priorityDropdown={priorityDropdown} setPriorityDropdown={setPriorityDropdown}/>

					<div className={"calendar-container"}>
						<label htmlFor="due-date">Due:</label>
						<input value={dueDate} onChange={(e) => handleDate(e)} type="date" min={currentDate} id="due-date"
						       name="due-date"/>
					</div>
				</div>
			</Wrapper>
		</StyledForm>
	)
}

export default Form;