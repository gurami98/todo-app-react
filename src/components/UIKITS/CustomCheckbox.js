import styled from "styled-components";

const CustomCheckbox = styled.div`
  border-radius: 5px;
  position: relative;
  background-color: #F6F4F4;
  display: flex;
  padding: 3px 5px;
  
  & label{
    position: relative;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 18px;
    left: 0;
    top: 0;
    width: 18px;
    &:after{
      border: 2px solid #27BD75;
      border-top: none;
      border-right: none;
      content: "";
      height: 4px;
      left: 4px;
      opacity: 0;
      position: absolute;
      top: 5px;
      transform: rotate(-45deg);
      width: 9px;
    }
  }
  
  & input[type="checkbox"]{
    visibility: hidden;
    position: absolute;
    left: -9999px;
    
    &:checked + label:after{
      opacity: 1;
    }
  }
  
  ${props => props.type === 'itemCheckbox' && 
          ` background-color: transparent; ` 
  }  
`

export default CustomCheckbox