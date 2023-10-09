import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [update, setUpdate] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser, update, setUpdate }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
