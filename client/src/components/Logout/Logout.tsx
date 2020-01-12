import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router';

const Logout = () => {
  const history = useHistory();

  React.useEffect(() => {
    Axios.delete('auth/logout');
    history.push('/home');
  });

  return <></>;
};

export default Logout;
