import styled from "styled-components";
import CustomButton from "../../UIKITS/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { chooseActiveCategory } from "../../../store/actionCreators";
const Container = styled.div`  	
	/* width */
  &::-webkit-scrollbar {
    height: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #2794BD;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
	
    width: 522px;
    display: flex;
    overflow-y: auto;
    flex-direction: row;
    column-gap: 10px;		
		padding-bottom: 2px;
		box-sizing: border-box;
	@media (max-width: 800px){
		&{
			width: 382px;
			margin: 20px 20px 0;
		}
	}
  @media (max-width: 450px){
	  &{
		  width: 90%;
	  }
  }
`

const Categories = () => {
	const typeDropdownItemsSelector = useSelector((state) => state.typeDropdown.typeDropdownData)
	const dispatch = useDispatch()
	return (
		<Container>
			<CustomButton categoryBtn={true} onClick={(e) => dispatch(chooseActiveCategory(e.target.innerHTML))}>All Categories</CustomButton>
			{typeDropdownItemsSelector?.map((item, index) => {
				return (
					<CustomButton categoryBtn={true} key={index} onClick={(e) => dispatch(chooseActiveCategory(e.target.innerHTML))}>{item}</CustomButton>
				)
			})}
		</Container>
	)
}

export default Categories