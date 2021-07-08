import '../App.css';
import styled from 'styled-components'
import { useState } from "react";

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  list-style-type: none;
  text-align: left;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 10px 0;
  box-sizing: border-box;
  width: 100%;
	@media  (max-width: 800px){
		flex-direction: column;
    text-align: center;
  }

  ${props => props.timeLeft < 48 &&
          `border: 2px solid red`
  }
`

const CustomDiv = styled.div`
  display: flex;
  flex-direction: row;
	justify-content: space-around;
	padding: 1px 0 1px 0;
	width: inherit;
	@media (max-width: 800px){
		justify-content: center;
	}
`

const Button = styled.button`
  &:hover {
    opacity: 0.7;
  }
  color: white;
  border-radius: 3px;
  border: 0;
  cursor: pointer;
  height: 20px;
	margin-left: auto;
	background-color: #fc0303;
	
	@media (max-width: 800px){
		margin-left: 0;
	}
  ${props => props.type === "edit" &&
		`margin: 0 0 0 10px;
     background-color: #fab905;` 		
	}
  ${props => props.disabled && props.type === "edit" &&
		`color: #a2a199;
		 background-color: #c7c1c1;
		 &:hover {
      opacity: 1;
		  cursor: default
     }` 
	}
  ${props => props.disabled && props.type === "delete" &&
          `color: #a2a199;
		 background-color: #c7c1c1;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
  }
`

const Item = ({paginationInfo, setPaginationInfo, list, setList, item, index, itemsToShow, setActive, activePage}) => {
	const [editText, setEditText] = useState(item.text)
	const [beingEdited, setBeingEdited] = useState(false)

	const markDone = (e, index) => {
		setList([...list].map(item => item.id === index ? {...item, done: e.target.checked} : item))
	}

	const deleteItem = (index) => {
		if (window.confirm('Are you sure you want to delete this item')) {
			let newArr = [...list]
				newArr = newArr.filter(item => {
				return item.id !== index
			})
			setList(newArr)
			let listCount = newArr.length
			let pageCount = Math.ceil(listCount / itemsToShow)
			if(!listCount) setPaginationInfo({...paginationInfo, pageNumbers: [1]})
			else if(!(listCount % itemsToShow) && activePage === paginationInfo.pageNumbers) {
				setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
				setActive(pageCount)
			}else if(!(listCount % itemsToShow) && activePage < paginationInfo.pageNumbers){
				setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
			}
		}
	}

	const editItem = (index) => {
		setBeingEdited(!beingEdited)
		if (beingEdited) {
			if (editText.trim()) {
				let newArr = [...list]
				newArr = newArr.map(item => {
					if (item.id === index) item.text = editText
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
		<ListItem key={index} className={hoursLeft > 48 ? 'red-overlay' : ''} timeLeft={hoursLeft}>
			<CustomDiv>
				<input type="checkbox" onChange={(e) => markDone(e, index)} checked={item.done}/>
				{
					beingEdited ? <input onKeyDown={handleKeyPress} autoFocus type="text" id={'li-' + index} value={editText}
					                     onChange={e => setEditText(e.target.value)}/>
						:
						<span className={item.done ? 'finished-item' : ''} onDoubleClick={() => editItem(index)}>{item.text}</span>
				}
				<span>Due: {hoursLeft > 48 ? item.dueDate : hoursLeft > 24 ? 'TOMORROW' : 'TODAY'}</span>
			</CustomDiv>
			<CustomDiv>
				<Button disabled={beingEdited} type={"delete"} onClick={() => deleteItem(index)}>Delete</Button>
				<Button disabled={item.done} type={"edit"} onClick={() => editItem(index)}>Edit</Button>
			</CustomDiv>
		</ListItem>
	)
}

export default Item;