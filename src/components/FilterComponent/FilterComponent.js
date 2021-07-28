import DeleteSelectedBtn from "./DeleteSelectedBtn";
import ItemNumberDropdown from "../ItemNumberDropdown";
import FilterDropdown from "../FilterDropdown";
import Categories from "./Categories";

const FilterComponent = ({isAnyItemChecked, list, tickHandler, deleteSelectedHandler, checkedAll, itemsToShow, setItemsToShow, setList, setActiveCategory}) => {

	return (
		<>
			<div id="filter-row1">
				<DeleteSelectedBtn tickHandler={tickHandler} deleteSelectedHandler={deleteSelectedHandler}
				                   isAnyItemChecked={isAnyItemChecked}  checkedAll={checkedAll}/>

				<ItemNumberDropdown itemsToShow={itemsToShow} setItemsToShow={setItemsToShow}/>

				<FilterDropdown list={list} setList={setList}/>
			</div>

			<Categories setActiveCategory={setActiveCategory}/>
		</>
	)
}

export default  FilterComponent