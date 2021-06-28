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

const List = ({list, setList, activePage, itemsToShow}) => {
	let startIndex = (activePage - 1) * itemsToShow
	let endIndex = startIndex + (itemsToShow - 1);
	return (
		<UnorderedList>
			{
				list.map((item, index) => {
						if (index >= startIndex && index <= endIndex) {
							return (
								<Item list={list} setList={setList} item={item} index={index} key={index}/>
							)
						}

				})
			}
		</UnorderedList>
	)
}

export default List;