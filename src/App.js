import './App.css';
import { useState } from "react";
import List from './components/List'
import Form from './components/Form'
import Pagination from './components/Pagination'
import Dropdown from './components/Dropdown'

const App = () => {
  const [list, setList] = useState([])
  const [activePage, setActive] = useState(1)
  const [itemsToShow, setItemsToShow] = useState(8)

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
      <Dropdown itemsToShow={itemsToShow} setItemsToShow={setItemsToShow}/>
      <List itemsToShow={itemsToShow} list={list} setList={setList} activePage={activePage}/>
      <Pagination itemsToShow={itemsToShow} list={list} activePage={activePage} setActive={setActive} changePage={changePage}/>
    </div>
  );
}

export default App;
