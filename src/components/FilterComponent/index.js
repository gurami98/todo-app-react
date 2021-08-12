import DeleteSelectedBtn from "./DeleteSelectedBtn";
import ItemNumberDropdown from "./ItemNumberDropdown";
import FilterDropdown from "./FilterDropdown";
import Categories from "./Categories";
import './FilterComponent.css'

const FilterComponent = ({ isAnyItemChecked, selectAllHandler, deleteSelectedHandler}) => {

	return (
		<>
			<div id="filter-row1">
				<DeleteSelectedBtn selectAllHandler={selectAllHandler} deleteSelectedHandler={deleteSelectedHandler}
				                   isAnyItemChecked={isAnyItemChecked} />

				<ItemNumberDropdown/>

				<FilterDropdown/>
			</div>

			<Categories/>
		</>
	)
}

export default  FilterComponent