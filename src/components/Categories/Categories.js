import styled from "styled-components";
import CustomButton from "../UIKITS/CustomButton";

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

// const Button = styled.button`
// 	margin-top: 10px;
//   color: #2794BD;
//   border: 0;
//   font-size: 14px;
// 	min-width: fit-content;
// 	background-color: #F6F4F4;
// 	padding: 5px 10px;
// 	border-radius: 6px;
//
// 	&:hover{
// 		cursor: pointer;
// 		opacity: 0.7;
// 	}
// `

const Categories = ({setActiveCategory}) => {
	let typeDropdownItems = JSON.parse(window.localStorage.getItem('typeDropdownData'))
	return (
		<Container>
			<CustomButton categoryBtn={true} onClick={(e) => setActiveCategory(e.target.innerHTML)}>All Categories</CustomButton>
			{typeDropdownItems.map((item, index) => {
				return (
					<CustomButton categoryBtn={true} key={index} onClick={(e) => setActiveCategory(e.target.innerHTML)}>{item}</CustomButton>
				)
			})}
		</Container>
	)
}

export default Categories