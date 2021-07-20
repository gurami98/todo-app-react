import styled from "styled-components";
import { useEffect } from "react";

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

const Dropdown = ({
	                  paginationInfo,
	                  setPaginationInfo,
	                  itemsToShow,
	                  setItemsToShow,
	                  listCount,
	                  pageCount,
	                  setActive
                  }) => {

	const itemNumbers = [2, 4, 5, 8]

	const changeItemsToShow = (e) => {
		setItemsToShow(parseInt(e.target.value))
	}

	useEffect(() => {
		if (!listCount) setPaginationInfo({...paginationInfo, pageNumbers: 1})
		else {
			setPaginationInfo({
				...paginationInfo,
				pageNumbers: pageCount,
				endPage: pageCount,
				startPage: pageCount > 5 ? pageCount - 4 : 1
			})
			setActive(pageCount)
		}
	}, [itemsToShow])

	return (
		<Container>
			<span>Show Items</span>
			<DropDownMenu value={itemsToShow} onChange={changeItemsToShow}>
				{itemNumbers.map(item => <option key={item} value={item} defaultValue={item === 8 ? 8 : null}>{item}</option>)}
			</DropDownMenu>
		</Container>
	)
}

export default Dropdown