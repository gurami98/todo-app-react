import styled from "styled-components";
import { connect } from "react-redux";
import {setActivePage, changePagination} from "../../store/actionCreators";
import * as todoSelectors from "../../selectors/todoSelectors";
import {getPaginationInfo} from "../../selectors/todoSelectors";

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

  &:nth-of-type(1) {
    border-left: 1px solid lightgray;
  }

  &:hover {
    color: white;
    background-color: #409df5;
  }

  &.active-page {
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

const Pagination = ({ paginationInfo, filteredArrByCategory, itemsToShowCountSelector, pagesToShowSelector, activePage, changePagination, setActivePage,}) => {
	let listCount = filteredArrByCategory.length
	let pageCount = Math.ceil(listCount / itemsToShowCountSelector) || 1

	const changePage = (page) => {
		setActivePage(page)
		if (pageCount >= pagesToShowSelector) {
			if (page <= pagesToShowSelector) {
				changePagination({endPage: pagesToShowSelector, startPage: 1})
			} else if (page >= pageCount - pagesToShowSelector + 1) {
				changePagination({
					endPage: pageCount,
					startPage: pageCount - pagesToShowSelector + 1
				})
			} else {
				changePagination({endPage: page + 2, startPage: page - 2})
			}
		}
	}
	const prevPage = (page) => {
		if (page > 1) {
			setActivePage(page - 1)

			if (page >= paginationInfo.pagesToShow) {
				if (page - 1 >= pageCount - paginationInfo.pagesToShow + 1 && page - 1 > paginationInfo.pagesToShow) {
					changePagination({
						endPage: pageCount,
						startPage: pageCount - paginationInfo.pagesToShow + 1
					})
				} else if (activePage > paginationInfo.pagesToShow + 1) {
					changePagination({endPage: page + 1, startPage: page - 3})
				} else {
					changePagination({endPage: paginationInfo.pagesToShow, startPage: 1})
				}
			}
		}
	}

	const nextPage = (page) => {
		if (page < pageCount) {
			setActivePage(page + 1)

			if (page >= paginationInfo.pagesToShow) {
				if (activePage + 1 >= pageCount - paginationInfo.pagesToShow + 1 && activePage + 1 > paginationInfo.pagesToShow) {
					changePagination({
						endPage: pageCount,
						startPage: pageCount - paginationInfo.pagesToShow + 1
					})
				} else if (activePage + 1 > paginationInfo.endPage - 2 && activePage + 1 > 5) {
					changePagination({endPage: page + 3, startPage: page - 1})
				}
			}
		}
	}

	let pageDecrementBtn = null
	if (paginationInfo.startPage > 1 && pageCount > 6) {
		pageDecrementBtn = <PageButton onClick={() => prevPage(activePage)}> &hellip; </PageButton>
	}

	let pageIncrementBtn = null
	if (pageCount > paginationInfo.endPage && pageCount > 6) {
		pageIncrementBtn = <PageButton onClick={() => nextPage(activePage)}> &hellip; </PageButton>
	}

	let pagesArr = []
	if (!pageCount) pagesArr.push(<PageButton onClick={() => changePage(1)}
	                                          className={1 === activePage ? "active-page" : ''}
	                                          key={1}>{1}</PageButton>)
	else for (let i = paginationInfo.startPage; i <= paginationInfo.endPage; i++) {
		pagesArr.push(<PageButton onClick={() => changePage(i)} className={i === activePage ? "active-page" : ''}
		                          key={i}>{i}</PageButton>)
	}

	return (
		<CustomPagesDiv>
			{pageCount > 1 && <PageLeft onClick={() => prevPage(activePage)}>Prev</PageLeft>}
			{activePage >= paginationInfo.pagesToShow + 1 &&
			<PageButton onClick={() => changePage(1)} className={1 === activePage ? "active-page" : ''}
			            key={1}>1</PageButton>}
			{pageDecrementBtn}
			{pagesArr}
			{pageIncrementBtn}
			{pageCount > paginationInfo.endPage &&
			<PageButton onClick={() => changePage(pageCount)} className={pageCount === activePage ? "active-page" : ''}
			            key={pageCount}>{pageCount}</PageButton>}
			{pageCount > 1 && <PageRight onClick={() => nextPage(activePage)}>Next</PageRight>}
		</CustomPagesDiv>
	)
}

const mapStateToProps = (state) => {
	return {
		filteredArrByCategory: todoSelectors.getFilteredArrayByCategory(state),
		paginationInfo: todoSelectors.getPaginationInfo(state),
		activePage: todoSelectors.getActivePage(state),
		pagesToShowSelector: todoSelectors.getPagesToShow(state),
		itemsToShowCountSelector: todoSelectors.getItemsToShowCount(state)
	}
}

const mapDispatchToProps = {
	setActivePage,
	changePagination
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)