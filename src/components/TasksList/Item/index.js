import styled from 'styled-components'
import {useEffect, useState} from "react";
import { MdArrowDropDown } from 'react-icons/md';
import CustomButton from "../../UIKITS/CustomButton";
import './Item.css'
import {deleteTodoItem, updateTodoItem} from "../../../API/todoAPI";
import {connect} from "react-redux";
import {changePagination, deleteTodo, markDone, setActivePage} from '../../../store/actionCreators'
import * as todoSelectors from "../../../selectors/todoSelectors"
import CustomCheckbox from "../../UIKITS/CustomCheckbox";

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  list-style-type: none;
  text-align: left;
  border-radius: 3px;
  padding: 5px 10px 5px 0;
  margin: 10px 0;
  box-sizing: border-box;
	background-color: #EBEBEB;
  width: 100%;
	@media  (max-width: 800px){
		flex-direction: column;
    text-align: center;
  }
	
  ${props => props.deadLine &&  
          `background-color: #FFE6E6`
  }  
`

const CustomDiv = styled.div`
  display: flex;
  flex-direction: row;
	justify-content: space-between;
	padding: 1px 0 1px 0;
	width: inherit;
	align-items: center;  
	@media (max-width: 800px){
		justify-content: center;
	}

  ${props => props.status === true ?
          `& span{
                word-wrap: break-word;
                white-space: unset;
          }
          `
          : `& span{
                word-wrap: unset;
                white-space: nowrap;
          }`

  }
`

const CustomContentDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1px 0 1px 10px;
  box-sizing: border-box;
  width: inherit;
  @media (max-width: 800px) {
    justify-content: center;
  }

  ${props => props.status === true ?
          `display: flex`
          : `display: none`

  }
`

const PriorityContainer = styled.div`
	height: 18.8px;
	width: 10px;
	border-radius: 4px;
  ${props => props.priority === 3 ?
          `background-color: #EB8383;` 
				  : props.priority === 2 ?
					`background-color: #FFBD86;`
					: `background-color: #86FFC9;`		  
  }
`

const EditText = styled.textarea`
	height: ${props => props.height};
`

const defaultHeight = 31;
const Item = ({ item, index, alertHandler, markDone, activePage, pageCount, deleteTodo, setActivePage, changePagination }) => {
	const [editText, setEditText] = useState(item.text)
	const [beingEdited, setBeingEdited] = useState(false)
	const [detailsShow, setDetailsShow] = useState(false)
	const [defaultLineCount, setDefaultLineCount] = useState(Math.ceil(editText.length / 29))
	const [customHeight, setCustomHeight] = useState(((defaultLineCount - 1) * 19) + defaultHeight)

	useEffect(() => {
		setActivePage(activePage >= pageCount ? pageCount : activePage)
		changePagination({
			pageNumbers: pageCount,
			startPage:(activePage >= pageCount - 4 && activePage > 5) ? pageCount - 4 : activePage <= 5 ? 1 : activePage - 2,
			endPage: activePage >= pageCount - 5 ? pageCount : activePage <= 5 ? 5 : activePage + 2,
		})
	}, [pageCount])

	const deleteItem = async (index) => {
		if (window.confirm('Are you sure you want to delete this item')) {
			try {
				await deleteTodoItem(index)
				deleteTodo(index)
				alertHandler('Item Successfully Removed', 'success')
			} catch (e) {
				alertHandler(e, 'error')
			}
		}
	}

	const updateHandler = async (index, params) => {
		try {
			await updateTodoItem(index, params)
			alertHandler('Item Successfully Edited', 'success')
			markDone(index, params)
		} catch (e) {
			alertHandler(e.response.data.message, 'error')
		}
	}

	const editItem = async (index, params) => {
		setBeingEdited(!beingEdited)
		if (beingEdited) {
			if (editText.trim()) {
				await updateHandler(index, params)
				setEditText(editText.trim())
			} else {
				setBeingEdited(true)
				alert('Enter some text')
			}
		}
	}

	const handleKeyPress = (e, index) => {
		if (e.key === 'Enter') editItem(index, {text: editText})
		else if (e.key === 'Escape') {
			setBeingEdited(false)
			setEditText(item.text)
		}
	}

	useEffect(()=>{
		const lineCount = Math.ceil(editText.length / 29)
		if(!lineCount){
			setCustomHeight(defaultHeight)
			setDefaultLineCount(1)
		}
		else if(lineCount !== defaultLineCount){
			setCustomHeight(((lineCount - 1) * 19) + defaultHeight)
			setDefaultLineCount(lineCount)
		}
	}, [editText])

	const handleCursor = (e) => {
		let val = e.target.value;
		e.target.value = '';
		e.target.value = val;
	}

	let hoursLeft = (new Date(item.dueDate) - new Date()) / (1000 * 60 * 60)

	return (
		<ListItem key={index} deadLine={hoursLeft < 48}>
			<CustomDiv status={detailsShow}>
				<CustomCheckbox type={'itemCheckbox'}>
					<input type="checkbox" id={index} onChange={(e) => updateHandler(index, {done: e.target.checked})} checked={item.done}/>
					<label htmlFor={index}/>
				</CustomCheckbox>
				{
					beingEdited ? <EditText autoFocus height={customHeight + "px"} className={'editable-span'} onKeyDown={(e) => handleKeyPress(e, index)} type="text" id={'li-' + index} value={editText}
					                     onChange={e => setEditText(e.target.value)} onFocus={handleCursor}/>
						:
						<span className={item.done ? 'finished-item' : ''} onDoubleClick={() => editItem(index)}>{item.text}</span>
				}
				<CustomButton detailsBtn={true}  onClick={() => setDetailsShow(!detailsShow)}>Details <MdArrowDropDown className='item-details-icon'/> </CustomButton>
				<PriorityContainer priority={item.priority}/>
			</CustomDiv>
			<CustomContentDiv status={detailsShow}>
				<p className='task-type'>To do for: <span >{item.taskCategory}</span></p>
				<div className='dates'>
					<p>Added on: <span>{new Date(item.timeAdded).toUTCString()}</span></p>
					<p>Due: <span>{item.dueDate}</span></p>
				</div>
				<div className='action-btns'>
						<CustomButton disabled={beingEdited} type={"delete"} onClick={() => deleteItem(index)}>Delete</CustomButton>
						<CustomButton disabled={item.done} type={"edit"} onClick={() => editItem(index, {text: editText})}>Edit</CustomButton>
				</div>
			</CustomContentDiv>
		</ListItem>
	)
}

const mapStateToProps = (state) => {
	return{
		activePage: todoSelectors.getActivePage(state),
		pageCount: todoSelectors.getPageCount(state)
	}
}

const mapDispatchToProps = {
	changePagination,
	deleteTodo,
	markDone,
	setActivePage
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);