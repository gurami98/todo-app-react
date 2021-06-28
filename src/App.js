import './App.css';
import { useState } from "react";
import List from './components/List'
import Form from './components/Form'
import Pagination from './components/Pagination'

const App = () => {
  const [list, setList] = useState([])
  const [activePage, setActive] = useState(1)

  const handleSubmit = (text) => {
    if(text.trim()) setList([...list, {text, done:false}])
    else alert('Enter an item')
  }

  const changePage = (page) => {
    setActive(page)
  }

  return (
    <div className="App">
      <Form handleSubmit={handleSubmit} />
      <List list={list} setList={setList} activePage={activePage}/>
      <Pagination list={list} activePage={activePage} setActive={setActive} changePage={changePage}/>
    </div>
  );
}

export default App;
