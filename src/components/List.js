import Item from './Item'
import styled from 'styled-components'

const UnorderedList = styled.ul`
  width: 522px;
	max-width: 522px;
	margin: 30px auto 0;
  padding-left: 0;
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