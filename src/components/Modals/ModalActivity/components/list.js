import { TableList } from '../../../Lists/TableList';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import ActivityRow from './row';
import PaginationComp from 'components/Pagination/Pages';

const List = ({
    dataPage,
    page,
    setPage,
    pagesQuantity,
    errorList,
    loadingList
}) => {
    const [activityRows, setActivityRows] = useState(<tr><td></td><td>No hay actividades con los filtros colocados</td></tr>)

    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            setActivityRows(
                // eslint-disable-next-line
                dataPage.map((item, key) => {
                    return (<ActivityRow
                        id={key}
                        key={key}
                        item={item}
                    />)
                })
            )
        } else {
            setActivityRows(<tr><td></td><td>No hay actividades con los filtros colocados</td></tr>)
        }
    }, [dataPage, errorList])

    return (
        <>
            <Row>
                <Col md="12" style={{ textAlign: "center" }}>
                    {
                        loadingList ?
                            <Spinner style={{ width: "150px", height: "150px" }} />
                            :
                            <TableList
                                titlesArray={["Fecha", "Nombre", "Usuario", "Actividad"]}>
                                {activityRows}
                            </TableList>
                    }
                </Col>
            </Row>
            <Row>
                <Col style={{ textAlign: "right" }} >
                    <PaginationComp
                        page={page}
                        setPage={setPage}
                        pagesQuantity={pagesQuantity}
                    />
                </Col>
            </Row>
        </>
    )
}

export default List