import styled from "styled-components";
import '../../styles/DeleteSelectedBtn.css'
import CustomButton from "../UIKITS/CustomButton";

// const Button = styled.button`
//   &:hover {
//     opacity: 0.7;
//   }
//
//   cursor: pointer;
//   vertical-align: super;
//   color: #EB8383;
//   background-color: #F6F4F4;
//   border: 0;
//   font-size: 14px;
//   border-radius: 5px;
//   width: 120px;
//   height: 100%;
//   ${props => props.disabled &&
//           `color: #a2a199;
// 				  background-color: #F6F4F4;
// 		 &:hover {
//       opacity: 1;
// 		  cursor: default
//      }`
//   }
// `

const DeleteSelectedBtn = ({tickHandler, isAnyItemChecked, deleteSelectedHandler,  checkedAll,  }) => {
	return (
		<div className='select-delete-main-container'>
			<div className="round">
				<input type="checkbox" id="select-all" name="select-all" checked={checkedAll} readOnly/>
				<label htmlFor="checkbox" onClick={tickHandler}/>
				<span>Select All</span>
			</div>
			<div className="delete-selected-btn-container">
				<CustomButton deleteSelectedBtn={true} disabled={!isAnyItemChecked} onClick={deleteSelectedHandler}>Delete Selected</CustomButton>
			</div>
		</div>
	)
}

export default DeleteSelectedBtn