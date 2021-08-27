import {createSelector} from "reselect";
const defaultCategory = 'All Categories'

export const getCurrentUsername = state => state.currentUser.username
export const getActivePage = state => state.paginationInfo.activePage

export const getItemsToShowCount = state => state.filterData.itemsToShowCount

export const getTodos = state => state.todos
export const getAlertInfo = state => state.alertInfo
export const getCategoryDropdown = state => state.filterData.category
export const getActiveCategory = state => state.filterData.category.activeCategory
export const getCategoryDropdownItems = state => state.filterData.category.options
export const getLoadingStatus = state => state.loading
export const getPagesToShow = state => state.paginationInfo.pagesToShow

export const getPriorityDropdown = state => state.filterData.priority
export const getPaginationInfo = state => state.paginationInfo
export const getFilterDropdown = state => state.filterData.sort

export const getIsAllItemChecked = createSelector(
    getTodos,
    (todosList) => todosList.every(item => item.done)
)

export const getIsAnyItemChecked = createSelector(
    getTodos,
    (todosList) => todosList.some(item => item.done)
)

export const getFilteredArrayByCategory = createSelector(
    getTodos,
    getActiveCategory,
    (todos, activeCategory) =>  {
        return todos.filter(item => (item.taskCategory === activeCategory || activeCategory === defaultCategory) && item)
    }
)

export const getItemsToShowList = createSelector(
    getFilteredArrayByCategory,
    getItemsToShowCount,
    getActivePage,
    (filteredArrByCategory, itemsToShowCount, activePage) => {
        let startIndex = (activePage - 1) * itemsToShowCount
        let endIndex = startIndex + itemsToShowCount
        return filteredArrByCategory.slice(startIndex, endIndex)
    }
)

export const getPageCount = createSelector(
    getFilteredArrayByCategory,
    getItemsToShowCount,
    (todos, itemsToShowCount) => {
        return Math.ceil(todos.length / itemsToShowCount) || 1
    }
)
