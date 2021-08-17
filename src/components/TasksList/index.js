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

const TasksList = ({itemsToShow, alertHandler}) => {

	if(itemsToShow.length) {
		return (
			<UnorderedList>
				{
					itemsToShow.map(item => {
						return (
							<Item alertHandler={alertHandler}
							      item={item} index={item._id} key={item._id}/>
						)
					})
				}

			</UnorderedList>
		)
	}else return(
		<h1>There are no items to show</h1>
	)
}

export default TasksList;