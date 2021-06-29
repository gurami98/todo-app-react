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
  const [pageNumbers, setPageNumbers] = useState(1)

  let listCount = list.length
  let pageCount = Math.ceil(listCount / itemsToShow)

  let startIndex = (activePage - 1) * itemsToShow
  let endIndex = startIndex + itemsToShow
  let itemsArr = list.slice(startIndex, endIndex)


  const handleSubmit = (text) => {
    let newArr = [...list, {text, done:false, id: new Date().getTime()}]
    if(text.trim()) {
      setList(newArr)
      let listCount = newArr.length
      let pageCount = Math.ceil(listCount / itemsToShow)
      if(listCount === 0) setPageNumbers([1])
      else if(listCount % itemsToShow === 1) {
        setPageNumbers(pageCount)
        setActive(pageCount)
      }
    }else alert('Enter an item')
  }

  const changePage = (page) => {
    setActive(page)
  }

  // add and delete handler functions for todo
  // edit item too

  return (
    <div className="App">
      <Form handleSubmit={handleSubmit} />
      <Dropdown listCount={listCount} pageCount={pageCount} setPageNumbers={setPageNumbers} setActive={setActive} itemsToShow={itemsToShow} setItemsToShow={setItemsToShow}/>
      <List setPageNumbers={setPageNumbers} setActive={setActive} list={list} setList={setList} itemsToShow={itemsToShow} itemsArr={itemsArr}/>
      <Pagination pageCount={pageCount} pageNumbers={pageNumbers} activePage={activePage} setActive={setActive} changePage={changePage}/>
    </div>
  );
}

export default App;
