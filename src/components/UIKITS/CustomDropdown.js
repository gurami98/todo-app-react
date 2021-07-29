import styled from "styled-components";

const CustomDropdown = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  max-width: 122px;
  min-width: 122px;
  right: 0;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
	& div:first-child{
    overflow-y: auto;
    height: 100px;
	}
	& p{
    color: black;
    padding: 6px 8px;
    margin: 0;
    text-decoration: none;
    display: block;
    text-align: left;
    overflow: hidden;
    font-size: 14px;
    text-overflow: ellipsis;
		&:hover{
      background-color: #ddd;
      cursor: pointer;
		}
	}

  ${props => props.show &&
          `display: block;`
  };

  @media (max-width: 800px){
    &{
      left: 50%;
      transform: translateX(-22%);
    }
  }
`

export  default  CustomDropdown