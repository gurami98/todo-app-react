import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import TypeDropdown from "./TypeDropdown";
import PriorityDropdown from "./PriorityDropdown";
import CustomButton from "../UIKITS/CustomButton";
import './Form.css'
import { useSelector, useDispatch } from 'react-redux'
import {
	choosePriority,
	chooseType,
	renderPriorityDropdown,
	renderTypeDropdown, resetPriority,
	resetType
} from "../../store/actionCreators";

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
	const priorityDropdownSelector = useSelector(({priorityDropdown}) => priorityDropdown)
	const typeDropdownSelector = useSelector(({typeDropdown}) => typeDropdown)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(renderPriorityDropdown({
			priorityDropdownShow: false,
			priorityDropdownData: ['Low', 'Medium', 'High'],
			priorityDropdownDataNumbers: [1, 2, 3],
			priorityDropdownText: defaultFormData.defaultPriorityText
		}))
		dispatch(renderTypeDropdown({
			typeDropdownShow: false,
			typeDropdownData: [...JSON.parse(window.localStorage.getItem('typeDropdownData'))],
			// typeDropdownInput: '',
			typeDropdownText: defaultFormData.defaultTypeText
		}))
	}, [])

	// const [priorityDropdown, setPriorityDropdown] = useState({
	// 	priorityDropdownShow: false,
	// 	priorityDropdownData: ['Low', 'Medium', 'High'],
	// 	priorityDropdownDataNumbers: [1, 2, 3],
	// 	priorityDropdownText: defaultFormData.defaultPriorityText
	// })
	//
	// const [typeDropdown, setTypeDropdown] = useState({
	// 	typeDropdownShow: false,
	// 	typeDropdownData: [...JSON.parse(window.localStorage.getItem('typeDropdownData'))],
	// 	typeDropdownInput: '',
	// 	typeDropdownText: defaultFormData.defaultTypeText
	// })

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
			let priorityIndex = priorityDropdownSelector.priorityDropdownData.indexOf(priorityDropdownSelector.priorityDropdownText)

			let listData = {
				text, taskType: typeDropdownSelector.typeDropdownText, dueDate, timeAdded: dateAdded,
				priority: priorityDropdownSelector.priorityDropdownDataNumbers[priorityIndex], done: false
			}
			submitHandler(listData)
			dispatch(resetType(defaultFormData.defaultTypeText))
			dispatch(resetPriority(defaultFormData.defaultPriorityText))
			// setTypeDropdown({...typeDropdown, typeDropdownText: defaultFormData.defaultTypeText})
			// setPriorityDropdown({...priorityDropdown, priorityDropdownText: defaultFormData.defaultPriorityText})
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

				<CustomButton type='button' onClick={(e) => handleSubmit(e, text)}>
					Add Task
				</CustomButton>
			</div>
			<Wrapper visible={wrapperVisible}>
				<div className="row1">
					<TypeDropdown typeDropdown={typeDropdownSelector} myStorage={myStorage}
					              // setTypeDropdown={setTypeDropdown}
					/>
				</div>

				<div className="row2">
					<PriorityDropdown priorityDropdown={priorityDropdownSelector}
					                  // setPriorityDropdown={setPriorityDropdown}
					/>

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