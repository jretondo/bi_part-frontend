import React from 'react';
import CommercialClientsForm from './commercialClient';
import OperativeClientsForm from './operativeClient';

const ClientsForm = ({
    setIsLoading,
    isOperativeClient,
    commercialClientInfo,
    operativeClientInfo,
    setIsOpenClientForm
}) => {

    return (<>
        {isOperativeClient ?
            <OperativeClientsForm
                setIsLoading={setIsLoading}
                commercialClientInfo={commercialClientInfo}
                operativeClientInfo={operativeClientInfo}
                setIsOpenClientForm={setIsOpenClientForm}
            />
            :
            <CommercialClientsForm
                setIsLoading={setIsLoading}
                commercialClientInfo={commercialClientInfo}
                setIsOpenClientForm={setIsOpenClientForm}
            />}
    </>)
}

export default ClientsForm