import Item from './Item'
import styled from 'styled-components'

const UnorderedList = styled.ul`
  width: 522px;
  margin-left: 0;
	margin-top: 30px;
`

const List = ({list, setList}) => {

	return (
		<UnorderedList>
			{
				list.map((item, index) => {
					return (
							<Item list={list} setList={setList} item={item} index={index} key={index}/>
					)
				})
			}
		</UnorderedList>
	)
}

export default List;