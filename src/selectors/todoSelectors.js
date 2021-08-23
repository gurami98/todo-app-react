import {createSelector} from "reselect";
const defaultCategory = 'All Categories'

export const getActivePage = state => state.paginationInfo.activePage
export const getItemsToShowCount = state => state.filterData.itemsToShowCount
export const getItemsToShow = state => state.filterData.itemsToShow
export const getFilteredArrByCategory = state => state.filterData.filteredArrByCategory

export const getTodos = state => state.todos
export const getAlertInfo = state => state.alertInfo
export const getActiveCategory = state => state.filterData.category.activeCategory
export const getLoadingStatus = state => state.loading
export const getPagesToShow = state => state.paginationInfo.pagesToShow

export const getIsAllChecked = state => state.filterData.isAllChecked
export const getIsAnyChecked = state => state.filterData.isAnyChecked

export const getIsAnyItemChecked = createSelector(
    getTodos,
    (todosList) => todosList.some(item => item.done)
)

export const filteredArrayByCategory = createSelector(
    getTodos,
    getActiveCategory,
    (todos, activeCategory) =>  todos.filter(item => (item.taskCategory === activeCategory || activeCategory === defaultCategory) && item)
)

export const itemsToShowList = createSelector(
    getFilteredArrByCategory,
    getItemsToShowCount,
    getActivePage,
    (filteredArrByCategory, itemsToShowCount, activePage) => {
        let startIndex = (activePage - 1) * itemsToShowCount
        let endIndex = startIndex + itemsToShowCount
        return filteredArrByCategory.slice(startIndex, endIndex)
    }
)
