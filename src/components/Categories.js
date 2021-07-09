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
`

const Categories = ({typeDropdown, setTypeDropdown}) => {

	return (
		<Container>
			{typeDropdown.typeDropdownData.map((item, index) => {
				return (
					<Button key={index}>{item}</Button>
				)
			})}
		</Container>
	)
}

export default Categories