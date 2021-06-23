import './App.css';
import { useState } from "react";
import List from './components/List'

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
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e)=> setText(e.target.value)}/>
        <button type='submit'>ADD</button>
      </form>
      <List list={list} setList={setList}/>
    </div>
  );
}

export default App;
