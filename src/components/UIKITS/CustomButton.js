import styled from "styled-components";

const editText = 'edit'
const deleteText = 'delete'

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
  
  ${props => props.type === editText &&
    `margin: 0 0 0 10px;
     color: #2794BD;
     height: 20px;`
  }
  ${props => props.type === deleteText &&
    `color: #EB8383;
     height: 20px;
	 margin-left: auto;`
  }
  ${props => props.type === editText && props.disabled  &&
    `color: #a2a199;
		 background-color: #c7c1c1;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
  }
  ${props => props.disabled && props.type === deleteText &&
    `color: #a2a199;
		 background-color: #c7c1c1;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
  }

  ${props => props.detailsBtn &&
      ``
  }
  
  ${props => props.detailsBtn &&
     `vertical - align: super;
      margin-left: 5px;
      border-radius: 5px;
      width: 100px;
      height: 100%;`
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

  ${props => props.dropBtn &&
      `width: 122px;`
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