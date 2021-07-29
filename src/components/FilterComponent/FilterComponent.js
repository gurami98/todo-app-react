import DeleteSelectedBtn from "./DeleteSelectedBtn/DeleteSelectedBtn";
import ItemNumberDropdown from "./ItemNumberDropdown/ItemNumberDropdown";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import Categories from "./Categories/Categories";
import './FilterComponent.css'

const FilterComponent = ({getTempList, setTempList, isAnyItemChecked, selectAllHandler, deleteSelectedHandler, isAllChecked, itemsToShowCount, setItemsToShowCount, setActiveCategory}) => {

	return (
		<>
			<div id="filter-row1">
				<DeleteSelectedBtn selectAllHandler={selectAllHandler} deleteSelectedHandler={deleteSelectedHandler}
				                   isAnyItemChecked={isAnyItemChecked}  isAllChecked={isAllChecked}/>

				<ItemNumberDropdown itemsToShowCount={itemsToShowCount} setItemsToShowCount={setItemsToShowCount}/>

				<FilterDropdown getTempList={getTempList} setTempList={setTempList}/>
			</div>

			<Categories setActiveCategory={setActiveCategory}/>
		</>
	)
}

export default  FilterComponent