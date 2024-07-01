import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// Get from storage or init it
const userIdValue = () => Number(window?.localStorage?.getItem('userId')) || Math.floor(Math.random() * 1000000) + 1;

// Create a socket to connect on the server passed as parameter
const useUserId = () => {
  const [userId, setUserId] = useState(userIdValue());

  // Set user id
  useEffect(() => {
    localStorage.setItem('userId', userId.toString());
  }, [userId]);

  return userId;
};

export default useUserId;