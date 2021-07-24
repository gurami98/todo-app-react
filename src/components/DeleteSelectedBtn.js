import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
  &:hover {
    opacity: 0.7;
  }

  cursor: pointer;
  vertical-align: super;
  color: #EB8383;
  background-color: #F6F4F4;
  border: 0;
  font-size: 14px;
  border-radius: 5px;
  width: 120px;
  height: 100%;
  ${props => props.disabled &&
    `color: #a2a199;
				  background-color: #F6F4F4;
		 &:hover {
      opacity: 1;
		  cursor: default
     }`
}
`

const DeleteSelectedBtn = ({
                               list,
                               setList,
                               checkedAll,
                               setCheckedAll,
                               paginationInfo,
                               setPaginationInfo,
                               listCount,
                               pageCount,
                               activePage,
                               setActive,
                               itemsToShow,
                               alertInfo,
                               setAlertInfo,
                               closeAlert
                           }) => {

    let isAnyItemChecked = false;
    list.forEach(item => {
        if (item.done) isAnyItemChecked = true
    })

    const tick = async () => {
        setCheckedAll(!checkedAll)
        let newArr = [...list]
        newArr = await newArr.map(item => {
            axios.put(`http://localhost:3001/todo/update-item/${item._id}`, {done: !checkedAll})
            return {...item, done: !checkedAll}
        })
        setList(newArr)
    }

    const deleteMethod = async (id) => {
        await axios.delete(`http://localhost:3001/todo/delete-item/${id}`)
    }

    const deleteSelected = async () => {
        await list.forEach(item => item.done && deleteMethod(item._id))
        let newArr = [...list]
        newArr = newArr.filter(item => {
            return !item.done
        })
        setList(newArr)
        setAlertInfo({...alertInfo, alertVisible: true, alertText: 'Items Succesfully Removed', alertType: 'success'})
        closeAlert()
        listCount = newArr.length
        pageCount = Math.ceil(listCount / itemsToShow)

        if (pageCount > activePage) {
            setPaginationInfo({...paginationInfo, pageNumbers: pageCount})
        } else if (!pageCount) {
            setPaginationInfo({...paginationInfo, pageNumbers: 1})
            setActive(1)
        } else {
            setActive(pageCount)
            setPaginationInfo({
                ...paginationInfo,
                pageNumbers: pageCount,
                endPage: pageCount,
                startPage: pageCount > 5 ? pageCount - paginationInfo.pagesToShow + 1 : 1
            })
        }
    }
    return (
        <div className='select-delete-main-container'>
            <div className="round">
                <input type="checkbox" id="select-all" name="select-all" checked={checkedAll} readOnly/>
                <label htmlFor="checkbox" onClick={tick}/>
                <span>Select All</span>
            </div>
            <div className="delete-selected-btn-container">
                <Button disabled={!isAnyItemChecked} onClick={deleteSelected}>Delete Selected</Button>
            </div>
        </div>
    )
}

export default DeleteSelectedBtn