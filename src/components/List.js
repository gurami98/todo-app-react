import Item from './Item'
import styled from 'styled-components'

const UnorderedList = styled.ul`
  width: 522px;
	max-width: 522px;
	height: 370px;
	margin: 30px auto 0;
  padding-left: 0;
  @media (max-width: 800px){
	  height: 550px;
	  width: 382px;
  }
  @media (max-width: 450px){
	  width: 90%;
  }
`

const List = ({list, setList, itemsArr, setPageNumbers, setActive, itemsToShow, activePage, pageNumbers}) => {

	return (
		<UnorderedList>
			{
				itemsArr.map((item) => {
						return (
							<Item setPageNumbers={setPageNumbers} setActive={setActive} list={list}
							      setList={setList} item={item} index={item.id} key={item.id} itemsToShow={itemsToShow} activePage={activePage} pageNumbers={pageNumbers}/>
						)
				})
			}
		</UnorderedList>
	)
}

export default List;