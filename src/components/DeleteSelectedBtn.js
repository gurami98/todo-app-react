import styled from "styled-components";
import '../styles/DeleteSelectedBtn.css'

const Button = styled.button`
  &:hover {
    opacity: 0.7;
  }

  cursor: pointer;
  vertical-align: super;
  color: #EB8383;
  background-color: #F6F4F4;
  border: 0;
  font-size: 14px;
  border-radius: 5px;
  width: 120px;
  height: 100%;
  ${props => props.disabled &&
          `color: #a2a199;
				  background-color: #F6F4F4;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
  }
`

const DeleteSelectedBtn = ({tickHandler, deleteSelectedHandler, list, checkedAll,  }) => {

	let isAnyItemChecked = false;
	list.forEach(item => {
		if (item.done) isAnyItemChecked = true
	})

	return (
		<div className='select-delete-main-container'>
			<div className="round">
				<input type="checkbox" id="select-all" name="select-all" checked={checkedAll} readOnly/>
				<label htmlFor="checkbox" onClick={tickHandler}/>
				<span>Select All</span>
			</div>
			<div className="delete-selected-btn-container">
				<Button disabled={!isAnyItemChecked} onClick={deleteSelectedHandler}>Delete Selected</Button>
			</div>
		</div>
	)
}

export default DeleteSelectedBtn