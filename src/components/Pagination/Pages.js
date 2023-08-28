import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap"

const PaginationComp = ({
    page,
    setPage,
    pagesQuantity
}) => {
    const [layoutPages, setLayoutPages] = useState(<></>)

    useEffect(() => {
        listPages()
        // eslint-disable-next-line
    }, [page, pagesQuantity])

    const pagePrev = (e) => {
        e.preventDefault()
        if (page > 1) {
            setPage(1)
        }
    }

    const nextPage = (e) => {
        e.preventDefault()
        if (pagesQuantity > page) {
            setPage(pagesQuantity)
        }
    }

    const changePage = (e, newPage) => {
        e.preventDefault()
        if (page !== newPage) {
            setPage(newPage)
        }
    }

    const listPages = () => {
        setLayoutPages(<></>)
        const min = (page - 3) <= 0 ? 0 : (page - 3)
        const max = (page + 2) >= pagesQuantity ? pagesQuantity : (page + 2)
        let layOut = <></>
        if (pagesQuantity > 0) {
            for (let i = min; i < max; i++) {
                layOut =
                    <>
                        {layOut}
                        <PaginationItem className={page === (i + 1) ? "active" : ""} key={i}>
                            <PaginationLink
                                href="#"
                                onClick={e => changePage(e, (i + 1))}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    </>

            }
        }
        setLayoutPages(layOut)
    }

    if (pagesQuantity > 1) {
        return (
            <>
                <nav aria-label="...">
                    <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                    >
                        <PaginationItem className={page === 1 ? "disabled" : ""}>
                            <PaginationLink
                                href="#"
                                onClick={e => pagePrev(e)}
                                tabIndex="-1"
                            >
                                <i className="fas fa-angle-double-left" />
                                <span className="sr-only">Primero</span>
                            </PaginationLink>
                        </PaginationItem>

                        {layoutPages}

                        <PaginationItem className={page === pagesQuantity ? "disabled" : ""}>
                            <PaginationLink
                                href="#"
                                onClick={e => nextPage(e)}
                            >
                                <i className="fas fa-angle-double-right" />
                                <span className="sr-only">Último</span>
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </nav>
            </>
        )
    } else {
        return null
    }

}

export default PaginationComp