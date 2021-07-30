import DeleteSelectedBtn from "./DeleteSelectedBtn";
import ItemNumberDropdown from "./ItemNumberDropdown";
import FilterDropdown from "./FilterDropdown";
import Categories from "./Categories";
import './FilterComponent.css'

export const filterData = {
	az: 'A-Z',
	za: 'Z-A',
	oldest: 'Oldest First',
	newest: 'Newest First',
	dueAsc: 'Due Ascending',
	dueDesc: 'Due Descending',
	prioAsc: 'Priority Asc',
	prioDesc: 'Priority Desc',
}

const FilterComponent = ({filterHandler, isAnyItemChecked, selectAllHandler, deleteSelectedHandler, isAllChecked, itemsToShowCount, setItemsToShowCount, setActiveCategory}) => {

	return (
		<>
			<div id="filter-row1">
				<DeleteSelectedBtn selectAllHandler={selectAllHandler} deleteSelectedHandler={deleteSelectedHandler}
				                   isAnyItemChecked={isAnyItemChecked}  isAllChecked={isAllChecked}/>

				<ItemNumberDropdown itemsToShowCount={itemsToShowCount} setItemsToShowCount={setItemsToShowCount}/>

				<FilterDropdown filterHandler={filterHandler}/>
			</div>

			<Categories setActiveCategory={setActiveCategory}/>
		</>
	)
}

export default  FilterComponent