import { useEffect, useRef, useState } from "react";
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

const Pagination = ({pageNumberLimit, setPageNumberLimit, maxPageNumberLimit, setMaxPageNumberLimit, minPageNumberLimit, setMinPageNumberLimit, pageCount, pageNumbers, activePage, setActive, changePage}) => {

	const prevPage = (page) => {
		if(page > 1) {
			setActive(page - 1)

			console.log(pageNumberLimit, activePage, page, minPageNumberLimit, maxPageNumberLimit)
			console.log("pageCount", pageCount)
			if(page - 1 >= pageCount - pageNumberLimit + 1){
				console.log("else if", activePage, pageCount, minPageNumberLimit, maxPageNumberLimit)
				setMaxPageNumberLimit(pageCount)
				setMinPageNumberLimit(pageCount - pageNumberLimit + 1)
			}
			else if(activePage > pageNumberLimit + 1){
				console.log("first if")
				setMaxPageNumberLimit(page + 1)
				setMinPageNumberLimit(page - 3)
			}
			else{
				console.log('else')
				setMaxPageNumberLimit(pageNumberLimit)
				setMinPageNumberLimit(minPageNumberLimit - 1)
			}
		}
	}

	const nextPage = (page) => {
		if(page < pageCount) {
			setActive(page + 1)

			console.log(pageNumberLimit, minPageNumberLimit, maxPageNumberLimit)
			if(activePage + 1 > maxPageNumberLimit){
				setMaxPageNumberLimit(page + 3)
				setMinPageNumberLimit(page - 1)
			}
		}
	}

	let pageDecrementBtn = null
	if(minPageNumberLimit > 1){
		pageDecrementBtn = <PageButton onClick={() => prevPage(activePage)}> &hellip; </PageButton>
	}

	let pageIncrementBtn = null
	if(pageNumbers > maxPageNumberLimit){
		pageIncrementBtn = <PageButton onClick={() => nextPage(activePage)}> &hellip; </PageButton>
	}

	let pagesArr = []
	for(let i = 1; i <= pageNumbers; i++){
		pagesArr.push(i) // JSX can be pushed also
	}

	let lastPage = pagesArr[pagesArr.length - 1]
	console.log(lastPage)
	return (
		<CustomPagesDiv>
			{pageCount > 1 && <PageLeft onClick={() => prevPage(activePage)}>Prev</PageLeft>}
			{activePage > pageNumberLimit && <PageButton onClick={() => changePage(1)} className={1 === activePage ? "active-page" : ''}
			             key={1}>1</PageButton>}
			{pageDecrementBtn}
			{
				pagesArr.map((page, index) => {
					if(page <= maxPageNumberLimit && page >= minPageNumberLimit) {
						return (
							<PageButton onClick={() => changePage(page)} className={page === activePage ? "active-page" : ''}
							            key={index}>{page}</PageButton>
						)
					}
				})
			}
			{pageIncrementBtn}
			{pageCount > maxPageNumberLimit && <PageButton onClick={() => changePage(lastPage)} className={lastPage === activePage ? "active-page" : ''}
			             key={lastPage}>{lastPage}</PageButton>}
			{pageCount > 1 && <PageRight onClick={() => nextPage(activePage)}>Next</PageRight>}
		</CustomPagesDiv>
	)
}

export default Pagination