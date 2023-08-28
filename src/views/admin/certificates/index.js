import React, { useContext, useEffect, useState } from 'react';
import secureContext from 'context/secureRoutes';
import apiRoutes from '../../../api/routes';
import { Container } from 'reactstrap';
import Header from 'components/Headers/Header';
import loadingContext from 'context/loading';
import ClientsForm from './form';
import ClientsList from './list';
import CertRequestForm from './csr';

const CertificatesModule = () => {
    const [isOpenCertificateForm, setIsOpenCertificateForm] = useState(false)
    const [certificateInfo, setCertificateInfo] = useState(false)
    const [isOpenCertRequest, setIsOpenCertRequest] = useState(false)

    const { setUrlRoute } = useContext(secureContext)
    const { setIsLoading } = useContext(loadingContext)

    useEffect(() => {
        setUrlRoute(apiRoutes.routesDir.sub.certificates)
    }, [setUrlRoute])

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                {
                    isOpenCertificateForm ?
                        <ClientsForm
                            certificateInfo={certificateInfo}
                            setIsOpenCertificateForm={setIsOpenCertificateForm}
                            setIsLoading={setIsLoading}
                        />
                        : isOpenCertRequest ?
                            <CertRequestForm
                                setIsOpenCertRequest={setIsOpenCertRequest}
                            /> :
                            <ClientsList
                                setCertificateInfo={setCertificateInfo}
                                setIsOpenCertificateForm={setIsOpenCertificateForm}
                                setIsOpenCertRequest={setIsOpenCertRequest}
                                setIsLoading={setIsLoading}
                            />
                }
            </Container>
        </>
    )
}

export default CertificatesModule