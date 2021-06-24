import '../App.css';
import styled from 'styled-components'
import { useState } from "react";

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style-type: none;
  text-align: left;
  border: 1px solid gray;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 10px 0;
  box-sizing: border-box;
  width: 100%;
`

const Button = styled.button`
  &:hover {
    opacity: 0.7;
  }

  margin-left: auto;
  background-color: #fc0303;
  color: white;
  border-radius: 3px;
  border: 0;
  cursor: pointer;
  height: 20px;

`

const EditButton = styled(Button)`
  margin: 0 0 0 10px;
  background-color: #fab905;
`

const Item = ({list, setList, item, index}) => {
	const [editText, setEditText] = useState(item.text)
	const [beingEdited, setBeingEdited] = useState(false)

	const markDone = (e, index) => {
		let updated
		if (e.target.checked) {
			updated = list.map((item, i) => {
				if (index === i) item.done = true
				return item
			})
			setList(updated)
		} else {
			updated = list.map((item, i) => {
				if (index === i) item.done = false
				return item
			})
			setList(updated)
		}
	}


	const deleteItem = (index) => {
		let newArr = [...list]
		newArr.splice(index, 1)
		setList(newArr)
	}


	const editItem = (index) => {
		setBeingEdited(!beingEdited)
		if (beingEdited) {
			if (editText.trim()) {
				let newArr = [...list]
				newArr[index].text = editText
				setList(newArr)
			} else {
				setBeingEdited(true)
				alert('Enter some text')
			}
		}
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') editItem(index)
		else if (e.key==='Escape') {
			console.log('esc clicked')
			setList(list)
			setBeingEdited(false)
			setEditText(list[index].text)
		}
	}

	return (
		<ListItem key={index}>
			<input type="checkbox" onChange={(e) => markDone(e, index)} checked={item.done}/>
			{
				beingEdited ? <input onKeyDown={handleKeyPress} autoFocus type="text" id={'li-' + index} value={editText} onChange={e => setEditText(e.target.value)}/>
					: <span className={item.done ? 'finished-item' : ''} onDoubleClick={() => editItem(index)}>{item.text}</span>
			}
			<Button onClick={() => deleteItem(index)}>Delete</Button>
			<EditButton onClick={() => editItem(index)}>Edit</EditButton>
		</ListItem>
	)
}

export default Item;