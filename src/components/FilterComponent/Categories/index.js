import styled from "styled-components";
import CustomButton from "../../UIKITS/CustomButton";
import { connect } from "react-redux";
import {chooseActiveCategory} from "../../../store/actionCreators";
import * as todoSelectors from "../../../selectors/todoSelectors";
const defaultCategory = 'All Categories'
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

const Categories = ({activeCategory, chooseActiveCategory, categoryDropdownItems}) => {

	const handleCategoryChange = (category) => {
		chooseActiveCategory(category)
	}

	return (
		<Container>
			<CustomButton categoryBtn={true} activeCategoryBtn={activeCategory === defaultCategory} onClick={(e) => handleCategoryChange(e.target.innerHTML)}>{defaultCategory}</CustomButton>
			{categoryDropdownItems?.map((item, index) => {
				return (
					<CustomButton categoryBtn={true} activeCategoryBtn={activeCategory === item} key={index} onClick={(e) => handleCategoryChange(e.target.innerHTML)}>{item}</CustomButton>
				)
			})}
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		activeCategory: todoSelectors.getActiveCategory(state),
		categoryDropdownItems: todoSelectors.getCategoryDropdownItems(state)
	}
}

const mapDispatchToProps = {
	chooseActiveCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)