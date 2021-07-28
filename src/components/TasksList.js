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

const TasksList = ({markAsDoneHandler, deleteItemHandler, editItemHandler, activeCategory, allCategories, itemsArr}) => {

	let ItemsArray = []
	itemsArr.map(item => (item.taskType === activeCategory || activeCategory === allCategories) && ItemsArray.push(
		<Item  markAsDoneHandler={markAsDoneHandler} editItemHandler={editItemHandler} deleteItemHandler={deleteItemHandler}
					 item={item} index={item._id} key={item._id} />
	))
	return (
		<UnorderedList>
			{ItemsArray}
		</UnorderedList>
	)
}

export default TasksList;