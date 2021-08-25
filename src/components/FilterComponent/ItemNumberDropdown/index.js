import styled from "styled-components";
import { connect } from "react-redux";
import {setItemsToShowCount} from "../../../store/actionCreators";
import {getItemsToShowCount} from "../../../selectors/todoSelectors";

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
const itemNumbers = [2, 4, 5, 8]

const ItemNumberDropdown = ({setItemsToShowCount, itemsToShowCount}) => {

	const changeItemsToShow = (e) => {
		setItemsToShowCount(parseInt(e.target.value))
	}

	return (
		<Container>
			<span>Show Items</span>
			<DropDownMenu value={itemsToShowCount} onChange={changeItemsToShow}>
				{itemNumbers.map(item => <option key={item} value={item} defaultValue={item === 8 ? 8 : null}>{item}</option>)}
			</DropDownMenu>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		itemsToShowCount: getItemsToShowCount(state),
	}
}

const mapDispatchToProps = {
	setItemsToShowCount
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemNumberDropdown)