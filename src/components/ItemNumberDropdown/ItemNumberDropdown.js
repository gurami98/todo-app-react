import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;

  & span {
    color: #2794BD;
  }
`

const DropDownMenu = styled.select`
  margin-left: 20px;

`

const ItemNumberDropdown = ({itemsToShow, setItemsToShow, }) => {

	const itemNumbers = [2, 4, 5, 8]

	const changeItemsToShow = (e) => {
		setItemsToShow(parseInt(e.target.value))
	}

	return (
		<Container>
			<span>Show Items</span>
			<DropDownMenu value={itemsToShow} onChange={changeItemsToShow}>
				{itemNumbers.map(item => <option key={item} value={item} defaultValue={item === 8 ? 8 : null}>{item}</option>)}
			</DropDownMenu>
		</Container>
	)
}

export default ItemNumberDropdown