import styled from "styled-components";

const DropDownMenu = styled.select`
	
`

const Dropdown = ({itemsToShow, setItemsToShow}) => {

	const changeItemsToShow = (e) => {
		setItemsToShow(parseInt(e.target.value))
	}

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