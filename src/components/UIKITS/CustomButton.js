import styled from "styled-components";

const CustomButton = styled.button`
  &:hover {
    opacity: 0.8;
  }

  cursor: pointer;
  border-radius: 5px;
  height: 25px;
  border: 0;
  color: #2794BD;
  background-color: #F6F4F4;
  @media (max-width: 800px) {
    margin-left: 0;
  }

  ${props => props.categoryBtn &&
          `margin-top: 10px;
			     font-size: 14px;
           min-width: fit-content;
           padding: 5px 10px;`
  }

	${props => props.deleteSelectedBtn &&
         `vertical-align: super;
				  color: #EB8383;
				  font-size: 14px;
				  width: 120px;
				  height: 100%;`
  }
  
  
  ${props => props.disabled &&
          `color: #a2a199;
				  background-color: #F6F4F4;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
  }
`

export default CustomButton