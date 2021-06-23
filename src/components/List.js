import '../App.css';
import Item from './Item'
function List({list, setList}) {

	// const deleteItem = (index) => {
	//   let newArr = [...list]
	//   newArr.splice(index, 1)
	//   setList(newArr)
	// }
	//
	// const editItem = (index) => {
	//
	// }
	return (
		<ul>
			{
				list.map((item, index) => {
					return (
							<Item list={list} setList={setList} item={item} index={index} key={index}/>
					)
				})
			}
		</ul>
	)
}

export default List;