import '../App.css';
function Item({list, setList, item, index}) {
	const markDone = (e, index) => {
		let updated
		if(e.target.checked){
			updated = list.map((item, i) => {
				if(index === i) item.done = 'true'
				return item
			})
			setList(updated)
		}
		else{
			updated = list.map((item, i) => {
				if(index === i) item.done = ''
				return item
			})
			setList(updated)
		}
	}

	return (
		<li key={index}>
			<input type="checkbox" onClick={(e)=>markDone(e, index)}/>
			<span className={item.done && 'finished-item'}>{item.text}</span>
			{/*<button onClick={()=> deleteItem(index)}>Delete</button>*/}
			{/*<button onClick={()=> editItem(index)}>Edit</button>*/}
		</li>
	)
}

export default Item;