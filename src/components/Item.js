import styled from 'styled-components'
import { useState } from "react";
import { MdArrowDropDown } from 'react-icons/md';
import '../styles/Item.css'

import axios from 'axios';

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

const DetailsButton = styled.button`
  &:hover{
    opacity: 0.7;
  }
  cursor: pointer;
  vertical-align: super;
  color: #2794BD;
  background-color: #F6F4F4;
  border: 0;
  font-size: 14px;
  border-radius: 5px;
  width: 100px;
  height: 100%;
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

const editText = 'edit'
const deleteText = 'delete'

const Button = styled.button`
  &:hover {
    opacity: 0.7;
  }
  border-radius: 3px;
  border: 0;
  cursor: pointer;
  height: 20px;
	margin-left: auto;
	background-color: #F6F4F4;
	
	@media (max-width: 800px){
		margin-left: 0;
	}
  ${props => props.type === editText &&
		`margin: 0 0 0 10px;
		 color: #2794BD` 		
	}
  ${props => props.type === deleteText &&
          `color: #EB8383`
  }
  ${props => props.type === editText && props.disabled  &&
		`color: #a2a199;
		 background-color: #c7c1c1;
		 &:hover {
      opacity: 1;
		  cursor: default
     }` 
	}
  ${props => props.disabled && props.type === deleteText &&
          `color: #a2a199;
		 background-color: #c7c1c1;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
  }
`

const Item = ({paginationInfo, setPaginationInfo, list, setList, item, index, itemsToShow, setActive, activePage, closeAlert, alertInfo, setAlertInfo}) => {
	const [editText, setEditText] = useState(item.text)
	const [beingEdited, setBeingEdited] = useState(false)
	const [detailsShow, setDetailsShow] = useState(false)
	const editItemInDB = async (index, e) => {
		try {
			await axios.put(`http://localhost:3001/todo/update-item/${index}`, {done: e.target.checked})
		}catch(e){
			setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
			closeAlert()
		}
	}
	const markDone = (e, index) => {
		editItemInDB(index, e)
		setList([...list].map(item => item._id === index ? {...item, done: e.target.checked} : item))
	}

	const deleteItem = async (index) => {
		if (window.confirm('Are you sure you want to delete this item')) {
			let newArr = [...list]
			newArr = newArr.filter(item => {
				return item._id !== index
			})
			try{
				await axios.delete(`http://localhost:3001/todo/delete-item/${index}`)
				setAlertInfo({...alertInfo, alertVisible: true, alertText: 'Item Succesfully Removed', alertType: 'success'})
				closeAlert()
			}catch(e){
				setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
				closeAlert()
			}

			setList(newArr)
			let listCount = newArr.length
			let pageCount = Math.ceil(listCount / itemsToShow)
			if(!listCount) setPaginationInfo({...paginationInfo, pageNumbers: 1})
			else if(!(listCount % itemsToShow) && activePage === paginationInfo.pageNumbers) {
				setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
				setActive(pageCount)
			}else if(!(listCount % itemsToShow) && activePage < paginationInfo.pageNumbers){
				setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
			}
		}
	}

	const editItem = async (index) => {
		setBeingEdited(!beingEdited)
		if (beingEdited) {
			if (editText.trim()) {
				try {
					await axios.put(`http://localhost:3001/todo/update-item/${index}`, {text: editText})
					setAlertInfo({...alertInfo, alertVisible: true, alertText: 'Item Successfully Edited', alertType: 'success'})
					closeAlert()
				}catch (e){
					setAlertInfo({...alertInfo, alertVisible: true, alertText: e.response.data.message, alertType: 'error'})
					closeAlert()
				}

				let newArr = [...list]
				newArr = newArr.map(item => {
					if (item._id === index) item.text = editText
					return item
				})
				setList(newArr)
			} else {
				setBeingEdited(true)
				alert('Enter some text')
			}
		}
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') editItem(index)
		else if (e.key === 'Escape') {
			setList(list)
			setBeingEdited(false)
			list.forEach(item => {
				if(item.id === index) setEditText(item.text)
			})
		}
	}

	let hoursLeft = (new Date(item.dueDate) - new Date()) / (1000 * 60 * 60)
	return (
		<ListItem key={index} deadLine={hoursLeft < 48}>
			<CustomDiv status={detailsShow}>
				<div className="round">
					<input type="checkbox" id={index} onChange={(e) => markDone(e, index)} checked={item.done}/>
					<label htmlFor={index}/>
				</div>
				{
					beingEdited ? <input onKeyDown={handleKeyPress} autoFocus type="text" id={'li-' + index} value={editText}
					                     onChange={e => setEditText(e.target.value)}/>
						:
						<span className={item.done ? 'finished-item' : ''} onDoubleClick={() => editItem(index)}>{item.text}</span>
				}
				<DetailsButton  onClick={() => setDetailsShow(!detailsShow)}>Details <MdArrowDropDown className='item-details-icon'/> </DetailsButton>
				<PriorityContainer priority={item.priority}/>
			</CustomDiv>
			<CustomContentDiv status={detailsShow}>
				<p className='task-type'>To do for: <span >{item.taskType}</span></p>
				<div className='dates'>
					<p>Added on: <span>{new Date(item.timeAdded).toUTCString()}</span></p>
					<p>Due: <span>{item.dueDate}</span></p>
				</div>
				<div className='action-btns'>
						<Button disabled={beingEdited} type={"delete"} onClick={() => deleteItem(index)}>Delete</Button>
						<Button disabled={item.done} type={"edit"} onClick={() => editItem(index)}>Edit</Button>
				</div>
			</CustomContentDiv>
		</ListItem>
	)
}

export default Item;