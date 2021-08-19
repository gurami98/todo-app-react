import './DeleteSelectedBtn.css'
import CustomButton from "../../UIKITS/CustomButton";
import {connect} from "react-redux";
import {deleteSelectedTodos, toggleAllTodosDone} from "../../../API/todoAPI";
import {
    changePagination,
    deleteSelected,
    markAllDone,
    setActivePage,
    toggleIsAllChecked
} from "../../../store/actionCreators";

const DeleteSelectedBtn = ({
                               alertHandler,
                                // redux state
                               todosList,
                               itemsToShowCountSelector,
                               activePageSelector,
                               isAllCheckedSelector,
                                // actions
                               changePagination,
                               deleteSelected,
                               setActivePage,
                               toggleIsAllChecked,
                               markAllDone
                           }) => {
    const isAnyItemChecked = todosList.some(item => item.done)

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
                <CustomButton deleteSelectedBtn={true} disabled={!isAnyItemChecked} onClick={deleteSelectedHandler}>Delete
                    Selected</CustomButton>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        todosList: state.todos,
        itemsToShowCountSelector: state.filterData.itemsToShowCount,
        activePageSelector: state.paginationInfo.activePage,
        isAllCheckedSelector: state.filterData.isAllChecked
    }
}

const mapDispatchToProps = {
    changePagination,
    deleteSelected,
    setActivePage,
    toggleIsAllChecked,
    markAllDone
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSelectedBtn)