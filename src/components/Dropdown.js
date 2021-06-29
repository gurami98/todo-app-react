import styled from "styled-components";
import { useEffect } from "react";

const DropDownMenu = styled.select`
	
`

const Dropdown = ({itemsToShow, setItemsToShow, listCount, pageCount, setPageNumbers, setActive}) => {

	const changeItemsToShow = (e) => {
		setItemsToShow(parseInt(e.target.value))
	}

	useEffect(() => {
		if(listCount === 0) setPageNumbers([1])
		else {
			setPageNumbers(pageCount)
			setActive(pageCount)
		}
	}, [itemsToShow])



	return (
		<>
			<span>Select Number Of Items To Show</span>
			<DropDownMenu value={itemsToShow} onChange={changeItemsToShow}>
				<option value={2}>2</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
				<option value={8} defaultValue={8}>8</option>
			</DropDownMenu>
		</>
	)
}

export default Dropdown