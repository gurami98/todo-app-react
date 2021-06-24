import './App.css';
import { useState } from "react";
import List from './components/List'
import styled from 'styled-components'

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  height: 70px;
  justify-content: space-around;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 3px;
`;

const Input = styled.input`
  text-indent: 5px;
  border-radius: 5px;
  height: 25px;
  outline: none;
  border: 1px solid gray;

`

const Button = styled.button`
  border-radius: 5px;
  height: 25px;
  border: 0;
  color: white;
  background-color: #329ea8;
`

function App() {

  const [text, setText] = useState('')
  const [list, setList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text) {
      console.log(...list)
      setList([...list, {text, done:''}])
      setText('')
    }else alert('Enter an item')
  }

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={text} onChange={e => setText(e.target.value)} placeholder='New Todo' />
        <Button type='submit'>Add Task</Button>
      </Form>
      <List list={list} setList={setList}/>
    </div>
  );
}

export default App;
