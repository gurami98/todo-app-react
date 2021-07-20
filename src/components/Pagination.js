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

const Pagination = ({paginationInfo, setPaginationInfo, pageCount, activePage, setActive, changePage}) => {

	const prevPage = (page) => {
		if (page > 1) {
			setActive(page - 1)

			if (page >= paginationInfo.pagesToShow) {
				if (page - 1 >= pageCount - paginationInfo.pagesToShow + 1 && page - 1 > paginationInfo.pagesToShow) {
					setPaginationInfo({
						...paginationInfo,
						endPage: pageCount,
						startPage: pageCount - paginationInfo.pagesToShow + 1
					})
				} else if (activePage > paginationInfo.pagesToShow + 1) {
					setPaginationInfo({...paginationInfo, endPage: page + 1, startPage: page - 3})
				} else {
					setPaginationInfo({...paginationInfo, endPage: paginationInfo.pagesToShow, startPage: 1})
				}
			}
		}
	}

	const nextPage = (page) => {
		if (page < pageCount) {
			setActive(page + 1)


			if (page >= paginationInfo.pagesToShow) {
				if (activePage + 1 >= pageCount - paginationInfo.pagesToShow + 1 && activePage + 1 > paginationInfo.pagesToShow) {
					setPaginationInfo({
						...paginationInfo,
						endPage: pageCount,
						startPage: pageCount - paginationInfo.pagesToShow + 1
					})
				} else if (activePage + 1 > paginationInfo.endPage - 2 && activePage + 1 > 5) {
					setPaginationInfo({...paginationInfo, endPage: page + 3, startPage: page - 1})
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
			{activePage > paginationInfo.pagesToShow &&
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

export default Pagination