import styled from "styled-components";

const CustomLogoutBtn = styled.button`
  border: 0;
  background-color: #EB8383;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 25px;
  border-radius: 3px;
  box-sizing: border-box;
  vertical-align: super;
  color: white;
  cursor: pointer;
  &:hover{
    opacity: 0.8;
  }
`

export default CustomLogoutBtn