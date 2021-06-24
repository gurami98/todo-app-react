import styled from "styled-components";
import { useState } from "react";

const StyledForm = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  height: 70px;
  justify-content: space-around;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 3px;
`

const Input = styled.input`
  text-indent: 5px;
  border-radius: 5px;
  height: 25px;
  outline: none;
  border: 1px solid gray;
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

const Form = ({handleSubmit}) => {
	const [text, setText] = useState('')

	return (
		<StyledForm onSubmit={(e) => {
			handleSubmit(text)
			setText(' ')
			e.preventDefault()
		}}>
			<Input autoFocus type="text" value={text} onChange={e => setText(e.target.value)} placeholder='New Todo'/>
			<Button type='submit'>Add Task</Button>
		</StyledForm>
	)
}

export default Form;