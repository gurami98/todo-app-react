import DeleteSelectedBtn from "./DeleteSelectedBtn";
import ItemNumberDropdown from "./ItemNumberDropdown";
import FilterDropdown from "./FilterDropdown";
import Categories from "./Categories";

const FilterComponent = ({ alertHandler}) => {

	return (
		<>
			<div id="filter-row1">
				<DeleteSelectedBtn alertHandler={alertHandler} />

				<ItemNumberDropdown/>

				<FilterDropdown/>
			</div>

			<Categories/>
		</>
	)
}

export default  FilterComponent