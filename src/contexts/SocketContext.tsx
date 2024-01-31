'use client'

import {createContext, ReactNode, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";

interface ISocketContexts {
    socket: Socket | null;
}

export const SocketContext = createContext({} as ISocketContexts);

export function SocketProvider({children}: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/streams`, {
            transports: ['websocket']
        });
        setSocket(newSocket);
    }, []);


    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}