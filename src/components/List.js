import Item from './Item'
import styled from 'styled-components'

const UnorderedList = styled.ul`
  width: 522px;
	max-width: 522px;
	//height: 370px;
	margin: 0 auto 0;
  padding-left: 0;
  @media (max-width: 800px){
	  height: 550px;
	  width: 382px;
  }
  @media (max-width: 450px){
	  width: 90%;
  }
`

const List = ({paginationInfo, setPaginationInfo, list, setList, itemsArr, setActive, itemsToShow, activePage, priorityDropdown, setPriorityDropdown }) => {

	return (
		<UnorderedList>
			{
				itemsArr.map((item) => {
						return (
							<Item paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo}
										setActive={setActive} list={list}
							      setList={setList} item={item} index={item.id} key={item.id} itemsToShow={itemsToShow} activePage={activePage}
							      priorityDropdown={priorityDropdown} setPriorityDropdown={setPriorityDropdown}/>
						)
				})
			}
		</UnorderedList>
	)
}

export default List;