import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: null, role: null });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');
    if (storedUserId && storedRole) {
      setUser({ userId: storedUserId, role: storedRole });
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
