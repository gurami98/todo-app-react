import styled from "styled-components";
import CustomButton from "../../UIKITS/CustomButton";
import { connect } from "react-redux";
import {chooseActiveCategory, setFilteredArrByCategory} from "../../../store/actionCreators";
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

const Categories = ({todosList, activeCategory, chooseActiveCategory, categoryDropdownItemsSelector, setFilteredArrByCategory}) => {

	const handleCategoryChange = (category) => {
		chooseActiveCategory(category)
		setFilteredArrByCategory(todosList)
	}

	return (
		<Container>
			<CustomButton categoryBtn={true} activeCategoryBtn={activeCategory === defaultCategory} onClick={(e) => handleCategoryChange(e.target.innerHTML)}>{defaultCategory}</CustomButton>
			{categoryDropdownItemsSelector?.map((item, index) => {
				return (
					<CustomButton categoryBtn={true} activeCategoryBtn={activeCategory === item} key={index} onClick={(e) => handleCategoryChange(e.target.innerHTML)}>{item}</CustomButton>
				)
			})}
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		todosList: state.todos,
		activeCategory: state.filterData.category.activeCategory,
		categoryDropdownItemsSelector: state.filterData.category.options
	}
}

const mapDispatchToProps = {
	chooseActiveCategory,
	setFilteredArrByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)