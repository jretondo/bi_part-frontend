import moment from 'moment';
import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Header from './components/header';
import List from './components/list';
import { useAxiosGetList } from '../../../hooks/useAxiosGetList';
import UrlNodeServer from '../../../api/routes';

export const ModalActivity = ({
    modal,
    toggle
}) => {
    const [page, setPage] = useState(1)
    const [refreshList, setRefreshList] = useState(false)
    const [userSearch, setUserSearch] = useState("")
    const [fromDate, setFromDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [toDate, setToDate] = useState(moment(new Date()).format("YYYY-MM-DD"))

    const {
        pagesQuantity,
        dataPage,
        errorList,
        loadingList
    } = useAxiosGetList(
        UrlNodeServer.activityDir.activity,
        page,
        refreshList,
        [
            { userId: userSearch },
            { dateFrom: fromDate },
            { dateTo: toDate }
        ]
    )

    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Actividad de la aplicación
            </ModalHeader>
            <ModalBody>
                <Header
                    toggleRefresh={() => setRefreshList(!refreshList)}
                    userSearch={userSearch}
                    setUserSearch={setUserSearch}
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                    modal={modal}
                    setPage={setPage}
                />
                <List
                    dataPage={dataPage}
                    page={page}
                    setPage={setPage}
                    pagesQuantity={pagesQuantity}
                    errorList={errorList}
                    loadingList={loadingList}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    toggle()
                }}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}