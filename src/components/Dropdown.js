import styled from "styled-components";
import { useEffect } from "react";

const Container = styled.div`
	display: flex;
	flex-direction: row;
`

const DropDownMenu = styled.select`
	margin-left: 20px;
	
`

const Dropdown = ({itemsToShow, setItemsToShow, listCount, pageCount, setPageNumbers, setActive, setMaxPageNumberLimit, setMinPageNumberLimit, setPageNumberLimit}) => {

	const changeItemsToShow = (e) => {
		setItemsToShow(parseInt(e.target.value))
	}

	useEffect(() => {
		if(listCount === 0) setPageNumbers([1])
		else {
			setPageNumbers(pageCount)
			setActive(pageCount)
			setMaxPageNumberLimit(pageCount)
			setMinPageNumberLimit(pageCount - 4)
		}
	}, [itemsToShow])



	return (
		<Container>
			<span>Show Items</span>
			<DropDownMenu value={itemsToShow} onChange={changeItemsToShow}>
				<option value={2}>2</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
				<option value={8} defaultValue={8}>8</option>
			</DropDownMenu>
		</Container>
	)
}

export default Dropdown