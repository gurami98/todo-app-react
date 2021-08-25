import './DeleteSelectedBtn.css'
import CustomButton from "../../UIKITS/CustomButton";
import {connect} from "react-redux";
import {deleteSelectedTodos, toggleAllTodosDone} from "../../../API/todoAPI";
import {
    changePagination,
    deleteSelected,
    markAllDone
} from "../../../store/actionCreators";
import * as todoSelectors from "../../../selectors/todoSelectors";

const DeleteSelectedBtn = ({
                               alertHandler,
                                // redux state
                               isAllChecked,
                               isAnyChecked,
                                // actions
                               deleteSelected,
                               markAllDone
                           }) => {

    const deleteSelectedHandler = async () => {
        try {
            await deleteSelectedTodos()
            alertHandler('Items Successfully Removed', 'success')
            deleteSelected()
        } catch (e) {
            alertHandler(e.response.data.message, 'error')
        }
    }

    const selectAllHandler = async () => {
        try {
            await toggleAllTodosDone({done: !isAllChecked})
            markAllDone(!isAllChecked)
        } catch (e) {
            alertHandler(e.response.data.message, 'error')
        }
    }

    return (
        <div className='select-delete-main-container'>
            <div className="round">
                <input type="checkbox" id="select-all" name="select-all" checked={isAllChecked} readOnly/>
                <label htmlFor="checkbox" onClick={selectAllHandler}/>
                <span>Select All</span>
            </div>
            <div className="delete-selected-btn-container">
                <CustomButton deleteSelectedBtn={true} disabled={!isAnyChecked} onClick={deleteSelectedHandler}>Delete
                    Selected</CustomButton>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAllChecked: todoSelectors.getIsAllItemChecked(state),
        isAnyChecked: todoSelectors.getIsAnyItemChecked(state)
    }
}

const mapDispatchToProps = {
    changePagination,
    deleteSelected,
    markAllDone,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSelectedBtn)