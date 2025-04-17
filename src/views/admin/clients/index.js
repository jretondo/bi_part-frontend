import React, { useContext, useEffect, useState } from 'react';
import secureContext from 'context/secureRoutes';
import apiRoutes from '../../../api/routes';
import { Container } from 'reactstrap';
import Header from 'components/Headers/Header';
import ClientsForm from './form';
import ClientsList from './list';
import LoadingContext from '../../../context/loading';

const ClientsModule = () => {
  const [isOpenClientForm, setIsOpenClientForm] = useState(false);
  const [commercialClientInfo, setCommercialClientInfo] = useState(false);
  const [operativeClientInfo, setOperativeClientInfo] = useState(false);
  const [isOperativeClient, setIsOperativeClient] = useState(false);

  const { setUrlRoute } = useContext(secureContext);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setUrlRoute(apiRoutes.routesDir.sub.clients);
  }, [setUrlRoute]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {isOpenClientForm ? (
          <ClientsForm
            setIsLoading={setIsLoading}
            isOperativeClient={isOperativeClient}
            commercialClientInfo={commercialClientInfo}
            operativeClientInfo={operativeClientInfo}
            setIsOpenClientForm={setIsOpenClientForm}
          />
        ) : (
          <ClientsList
            setIsLoading={setIsLoading}
            setCommercialClientInfo={setCommercialClientInfo}
            setOperativeClientInfo={setOperativeClientInfo}
            setIsOpenClientForm={setIsOpenClientForm}
            setIsOperativeClient={setIsOperativeClient}
          />
        )}
      </Container>
    </>
  );
};

export default ClientsModule;
