import Item from './Item'
import styled from 'styled-components'

const UnorderedList = styled.ul`
  width: 522px;
	max-width: 522px;
	margin: 0 auto 0;
  padding-left: 0;
  @media (max-width: 800px){
	  width: 382px;
  }
  @media (max-width: 450px){
	  width: 90%;
  }
`

const TasksList = ({activeCategory, allCategories, paginationInfo, setPaginationInfo, list, setList, itemsArr, setActive, itemsToShow, activePage, closeAlert, alertInfo, setAlertInfo}) => {

	let ItemsArray = []
	itemsArr.map(item => (item.taskType === activeCategory || activeCategory === allCategories) && ItemsArray.push(
		<Item paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
		      setActive={setActive} list={list}
		      setList={setList} item={item} index={item._id} key={item._id} itemsToShow={itemsToShow}
		      activePage={activePage} closeAlert={closeAlert} alertInfo={alertInfo} setAlertInfo={setAlertInfo}/>
	))
	return (
		<UnorderedList>
			{ItemsArray}
		</UnorderedList>
	)
}

export default TasksList;