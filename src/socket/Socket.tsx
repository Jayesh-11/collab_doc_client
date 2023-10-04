import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '../auth/Auth'
import { Socket, io } from 'socket.io-client'

type ClientSocketContextType = {
  clientSocket: Socket | null;
};

export const SocketContext = createContext<ClientSocketContextType>({ clientSocket: null })

const SocketWrapper = ({ children }: { children: ReactNode }) => {
  const { fbUser } = useAuth()
  const [clientSocket, setClientSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (fbUser) {
      const socket = io(import.meta.env.VITE_SOCKET_SERVER)
      socket.connect()
      setClientSocket(socket)
      socket.emit('app_initiated', {
        message: `${fbUser.uid} initiated the app`,
        fbUserId: fbUser.uid
      })
    }
    return () => {
      clientSocket && clientSocket.disconnect()
    }
  }, [fbUser])

  return <SocketContext.Provider value={{ clientSocket }}>
    {children}
  </SocketContext.Provider>
}

export default SocketWrapper

export const useSocket = () => {
  return useContext(SocketContext)
}