import './App.css';
import { useState } from "react";
import List from './components/List'
import Form from './components/Form'

const App = () => {
  const [list, setList] = useState([])

  const handleSubmit = (text) => {
    if(text.trim()) setList([...list, {text, done:false}])
    else alert('Enter an item')
  }

  return (
    <div className="App">
      <Form handleSubmit={handleSubmit} />
      <List list={list} setList={setList}/>
    </div>
  );
}

export default App;
