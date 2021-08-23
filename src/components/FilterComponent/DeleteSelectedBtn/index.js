import './DeleteSelectedBtn.css'
import CustomButton from "../../UIKITS/CustomButton";
import {connect} from "react-redux";
import {deleteSelectedTodos, toggleAllTodosDone} from "../../../API/todoAPI";
import {
    changePagination,
    deleteSelected,
    markAllDone,
    setActivePage,
    toggleIsAllChecked, toggleIsAnyChecked
} from "../../../store/actionCreators";
import {useEffect} from "react";
import * as todoSelectors from "../../../selectors/todoSelectors";

const DeleteSelectedBtn = ({
                               alertHandler,
                                // redux state
                               todosList,
                               itemsToShowCountSelector,
                               activePageSelector,
                               isAllCheckedSelector,
                               isAnyCheckedSelector,
                                // actions
                               changePagination,
                               deleteSelected,
                               setActivePage,
                               toggleIsAllChecked,
                               toggleIsAnyChecked,
                               markAllDone
                           }) => {

    useEffect(() => {
        toggleIsAnyChecked(todosList.some(item => item.done))
    }, [todosList])

    const deleteSelectedHandler = async () => {
        try {
            await deleteSelectedTodos()
            alertHandler('Items Successfully Removed', 'success')
            deleteSelected()
        } catch (e) {
            alertHandler(e.response.data.message, 'error')
        }
        let newArr = todosList.filter(item => !item.done)
        let listCount = newArr.length
        let pageCount = Math.ceil(listCount / itemsToShowCountSelector)
        setActivePage((pageCount >= activePageSelector && pageCount > 0) ? activePageSelector : pageCount === 0 ? 1 : pageCount)
        changePagination({
            pageNumbers: pageCount,
            startPage: activePageSelector >= pageCount - 4 ? pageCount - 4 : activePageSelector <= 5 ? 1 : activePageSelector - 2,
            endPage: activePageSelector >= pageCount - 5 ? pageCount : activePageSelector <= 5 ? 5 : activePageSelector + 2,
        })
    }

    const selectAllHandler = async () => {
        toggleIsAllChecked(!isAllCheckedSelector)
        try {
            await toggleAllTodosDone({done: !isAllCheckedSelector})
            markAllDone(!isAllCheckedSelector)
        } catch (e) {
            alertHandler(e.response.data.message, 'error')
        }
    }

    return (
        <div className='select-delete-main-container'>
            <div className="round">
                <input type="checkbox" id="select-all" name="select-all" checked={isAllCheckedSelector} readOnly/>
                <label htmlFor="checkbox" onClick={selectAllHandler}/>
                <span>Select All</span>
            </div>
            <div className="delete-selected-btn-container">
                <CustomButton deleteSelectedBtn={true} disabled={!isAnyCheckedSelector} onClick={deleteSelectedHandler}>Delete
                    Selected</CustomButton>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        todosList: todoSelectors.getTodos(state),
        itemsToShowCountSelector: todoSelectors.getItemsToShowCount(state),
        activePageSelector: todoSelectors.getActivePage(state),
        isAllCheckedSelector: todoSelectors.getIsAllChecked(state),
        isAnyCheckedSelector: todoSelectors.getIsAnyItemChecked(state)
    }
}

const mapDispatchToProps = {
    changePagination,
    deleteSelected,
    setActivePage,
    toggleIsAllChecked,
    markAllDone,
    toggleIsAnyChecked
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSelectedBtn)