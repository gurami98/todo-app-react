import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import CategoryDropdown from "./categoryDropdown";
import PriorityDropdown from "./PriorityDropdown";
import CustomButton from "../UIKITS/CustomButton";
import './Form.css'
import { connect } from 'react-redux'
import {
	resetPriority,
	resetCategory,
	renderCategoryDropdown,
	addTodo,
	setActivePage,
	changePagination,
} from "../../store/actionCreators";
import { addTodoItem } from "../../API/todoAPI";
import * as todoSelectors from "../../selectors/todoSelectors";
export const defaultFormData = {
	defaultCategoryText: 'University',
	defaultPriorityText: 'Medium'
}
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

const Form = ({
				  // states
	              priorityDropdownSelector,
	              categoryDropdownSelector,
				  // actions
	              alertHandler,
	              resetPriority,
	              resetCategory,
	              renderCategoryDropdown,
				  addTodo,
	              changePagination,
				  pageCount,
				  filteredArrByCategory,
				  setActivePage,
              }) => {
	let currentDate = new Date().toJSON().slice(0, 10)

	const formRef = useRef(null)

	const [dueDate, setDueDate] = useState(currentDate)
	const [text, setText] = useState('')
	const [wrapperVisible, setWrapperVisible] = useState(false)

	const myStorage = window.localStorage

	useEffect(() => {
		renderCategoryDropdown({
			options: [...JSON.parse(window.localStorage.getItem('categoryDropdownData'))],
			currentChoice: defaultFormData.defaultCategoryText,
			activeCategory: 'All Categories'
		})
	}, [])

	useEffect(() => {
		setActivePage(pageCount)
		changePagination({
			pageNumbers: pageCount,
			startPage: pageCount > 6 ? pageCount - 4 : 1,
			endPage: pageCount,
		})
	}, [filteredArrByCategory.length])

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
			let priorityIndex = priorityDropdownSelector.options.indexOf(priorityDropdownSelector.currentChoice)

			let listData = {
				text, taskCategory: categoryDropdownSelector.currentChoice, dueDate, timeAdded: dateAdded,
				priority: priorityDropdownSelector.optionNumbers[priorityIndex], done: false
			}
			try {
				const resp = await addTodoItem(listData)
				addTodo(resp.data)
				alertHandler('Item Successfully Added', 'success')
			} catch (e) {
				alertHandler(e.response.data.message, 'error')
			}

			resetCategory(defaultFormData.defaultCategoryText)
			resetPriority(defaultFormData.defaultPriorityText)
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
					<CategoryDropdown myStorage={myStorage}/>
				</div>

				<div className="row2">
					<PriorityDropdown/>

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

const mapStateToProps = (state) => {
	return {
		priorityDropdownSelector: todoSelectors.getPriorityDropdown(state),
		categoryDropdownSelector: todoSelectors.getCategoryDropdown(state),
		filteredArrByCategory: todoSelectors.getFilteredArrayByCategory(state),
		pageCount: todoSelectors.getPageCount(state),
		activePageSelector: todoSelectors.getActivePage(state)
	}
}

const mapDispatchToProps = {
	resetPriority,
	resetCategory,
	renderCategoryDropdown,
	addTodo,
	setActivePage,
	changePagination,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);