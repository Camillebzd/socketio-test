import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// Create a socket to connect on the server passed as parameter
const useSocket = (serverUrl: string, walletAddress: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(serverUrl);

    // Create user on server side on connection
    socketIo.on('connect', () => {
      socketIo.emit('createMember', { walletAddress });
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }

    return cleanup;
  }, [serverUrl, walletAddress]);

  return socket;
};

export default useSocket;