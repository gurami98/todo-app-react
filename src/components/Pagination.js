import { useEffect, useState } from "react";
import styled from "styled-components";

const CustomPagesDiv = styled.div`
  max-width: 522px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px auto 0;
`

const PageButton = styled.button`
	text-align: center;
  background-color: white;
  width: auto;
  cursor: pointer;
  color: #409df5;
  border-width: 1px 1px 1px 0;
  border-color: lightgray;
  border-style: solid;
	
	&:nth-of-type(1){
		border-left: 1px solid lightgray;
	}
  &:hover {
    color: white;
    background-color: #409df5;
  }
  &.active-page{
    color: white;
    background-color: #409df5;
  }
`

const PageLeft = styled(PageButton)`
  width: auto;
  border-radius: 5px 0 0 5px;
`
const PageRight = styled(PageButton)`
  width: auto;
  border-radius: 0 5px 5px 0;
`

const Pagination = ({list, activePage, setActive, changePage, itemsToShow}) => {
	let listCount = list.length
	let pageCount = Math.ceil(listCount / itemsToShow)
	let pagesArr = Array.from({length: pageCount}, (_, i) => i + 1)
	const [pages, setPages] = useState([1]);

	useEffect(() => {
		if(listCount === 0) setPages([1])
		else if(listCount % itemsToShow === 0 || listCount % itemsToShow  === 1) {
			setPages(pagesArr)
			setActive(pageCount)
		}
	},[list])

	useEffect(() => {
		setPages(pagesArr)
		setActive(pageCount)
	}, [itemsToShow])

	const prevPage = (page) => {
		if(page > 1) setActive(page - 1)
	}

	const nextPage = (page) => {
		if(page < pageCount) setActive(page + 1)
	}

	return (
		<CustomPagesDiv>
			{pageCount > 1 && <PageLeft onClick={() => prevPage(activePage)}>Prev</PageLeft>}
			{
				pages.map((page, index) => {
					return (
						<PageButton onClick={() => changePage(page)} className={page === activePage ? "active-page" : ''} key={index}>{page}</PageButton>
					)
				})
			}
			{pageCount > 1 && <PageRight onClick={() => nextPage(activePage)}>Next</PageRight>}
		</CustomPagesDiv>
	)
}

export default Pagination