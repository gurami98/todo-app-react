import DeleteSelectedBtn from "./DeleteSelectedBtn";
import ItemNumberDropdown from "./ItemNumberDropdown";
import FilterDropdown from "./FilterDropdown";
import Categories from "./Categories";

const FilterComponent = () => {

	return (
		<>
			<div id="filter-row1">
				<DeleteSelectedBtn/>

				<ItemNumberDropdown/>

				<FilterDropdown/>
			</div>

			<Categories/>
		</>
	)
}

export default  FilterComponent