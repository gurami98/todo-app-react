import styled from "styled-components";
import { useRef, useState } from "react";
import axios from "axios";
import TypeDropdown from "./TypeDropdown";
import PriorityDropdown from "./PriorityDropdown";

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

const Form = ({
	              typeDropdown,
	              setTypeDropdown,
	              currentDate,
	              list,
	              setList,
	              defaultFormData,
	              alertInfo,
	              setAlertInfo,
	              paginationInfo,
	              setPaginationInfo,
	              setActive,
				  itemsToShow,
				  closeAlert
              }) => {

	const [priorityDropdown, setPriorityDropdown] = useState({
		priorityDropdownShow: false,
		priorityDropdownData: ['Low', 'Medium', 'High'],
		priorityDropdownDataNumbers: [1, 2, 3],
		priorityDropdownText: defaultFormData.defaultPriorityText
	})

	const formRef = useRef(null)

	const [dueDate, setDueDate] = useState(currentDate)
	const [text, setText] = useState('')

	const [wrapperVisible, setWrapperVisible] = useState(false)

	const myStorage = window.localStorage

	const error = 'error'
	const success = 'success'

	const handleClickOutside = (e) => {
		document.removeEventListener("mousedown", handleClickOutside);
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

	const handleDate = (e) => {
		setDueDate(e.target.value)
	}

	const handleToggle = () => {
		setWrapperVisible(!wrapperVisible)
	}

	const addData = async (data) => {
		try {
			const resp = await axios.post('http://localhost:3001/todo/add', data)
			setList([...list, resp.data])
			setAlertInfo({...alertInfo, alertVisible: true, alertText: 'Item Succesfully Added', alertType: success})
			closeAlert()
			return true
		} catch (e) {
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: error})
			closeAlert()
			return false
		}
	}

	const handleSubmit = (text) => {
		if (text.trim() && dueDate.trim()) {
			let dateAdded = new Date()
			let priorityIndex = priorityDropdown.priorityDropdownData.indexOf(priorityDropdown.priorityDropdownText)

			let listData = {
				text, taskType: typeDropdown.typeDropdownText, dueDate, timeAdded: dateAdded,
				priority: priorityDropdown.priorityDropdownDataNumbers[priorityIndex], done: false
			}

			addData(listData).then((result) => {
				console.log(result)
				if (result) {
					let newArr = [...list, listData]
					setTypeDropdown({...typeDropdown, typeDropdownText: defaultFormData.defaultTypeText})
					setPriorityDropdown({...priorityDropdown, priorityDropdownText: defaultFormData.defaultPriorityText})
					setDueDate(currentDate)
					let listCount = newArr.length
					let pageCount = Math.ceil(listCount / itemsToShow)
					if (!listCount) setPaginationInfo({...paginationInfo, pageNumbers: 1})
					else if (listCount % itemsToShow === 1) {
						setActive(pageCount)
						if (pageCount > paginationInfo.endPage) {
							setPaginationInfo({
								...paginationInfo,
								endPage: pageCount,
								startPage: pageCount - paginationInfo.pagesToShow + 1,
								pageNumbers: pageCount
							})
						} else {
							setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
						}
					}
					setActive(pageCount)
					setPaginationInfo({
						...paginationInfo,
						endPage: pageCount,
						startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow + 1 : 1
					})
				}
			})
			setText('')
		} else alert('Enter every value needed in form')
	}

	return (
		<StyledForm ref={formRef} autoComplete="off">
			<div className="input-container">
				<label onClick={handleToggle}>+</label>
				<Input onFocus={() => setWrapperVisible(true)} id='add-item' placeholder='Add a task' autoFocus type="text"
				       value={text} onChange={e => setText(e.target.value)} onKeyDown={handleFormInputKeyPress}/>

				<Button type='button' onClick={handleFormInput}>
					Add Task
				</Button>
			</div>
			<Wrapper visible={wrapperVisible}>
				<div className="row1">
					<TypeDropdown setTypeDropdown={setTypeDropdown} typeDropdown={typeDropdown} myStorage={myStorage}/>
				</div>

				<div className="row2">
					<PriorityDropdown priorityDropdown={priorityDropdown} setPriorityDropdown={setPriorityDropdown}  />

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