import './DeleteSelectedBtn.css'
import CustomButton from "../../UIKITS/CustomButton";
import { useSelector } from "react-redux";

const DeleteSelectedBtn = ({selectAllHandler, isAnyItemChecked, deleteSelectedHandler}) => {
	const isAllCheckedSelector = useSelector(({isAllChecked}) => isAllChecked)
	return (
		<div className='select-delete-main-container'>
			<div className="round">
				<input type="checkbox" id="select-all" name="select-all" checked={isAllCheckedSelector} readOnly/>
				<label htmlFor="checkbox" onClick={selectAllHandler}/>
				<span>Select All</span>
			</div>
			<div className="delete-selected-btn-container">
				<CustomButton deleteSelectedBtn={true} disabled={!isAnyItemChecked} onClick={deleteSelectedHandler}>Delete Selected</CustomButton>
			</div>
		</div>
	)
}

export default DeleteSelectedBtn