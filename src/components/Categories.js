import styled from "styled-components";

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
			width: 90%;
			margin: 20px 20px 0;
		}
	}
`

const Button = styled.button`
	margin-top: 10px;
  color: #2794BD;
  border: 0;
  font-size: 14px;
	min-width: fit-content;
	background-color: #F6F4F4;
	padding: 5px 10px;
	border-radius: 6px;
	
	&:hover{
		cursor: pointer;
		opacity: 0.7;
	}
`

const Categories = ({list, setList, typeDropdown}) => {
	const allCategories = 'All Categories'

	const filterByCategory = (e) => {
		let tempArr = [...list]
		if(e.target.innerHTML === allCategories){
			setList(tempArr.map(item => {
				return {...item, visible: true}
			}))
		}
		else {
			setList(tempArr.map(item => {
				if (item.taskType !== e.target.innerHTML) {
					return {...item, visible: false}
				} else return {...item, visible: true}
			}))
		}
	}

	return (
		<Container>
			<Button onClick={(e) => filterByCategory(e)}>All Categories</Button>
			{typeDropdown.typeDropdownData.map((item, index) => {
				return (
					<Button key={index} onClick={(e) => filterByCategory(e, index)}>{item}</Button>
				)
			})}
		</Container>
	)
}

export default Categories