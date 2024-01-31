import Image from 'next/image';
import {FormEvent, useContext, useEffect, useRef, useState} from "react";
import {SocketContext} from "@/contexts/SocketContext";

interface IChatMessage {
    message: string;
    username: string;
    roomId: string;
    time: string;
}

export default function Chat({roomId}: { roomId: string }) {
    const currentMsg = useRef<HTMLInputElement>(null)
    const {socket} = useContext(SocketContext)
    const [chat, setChat] = useState<IChatMessage[]>([])

    useEffect(() => {
        socket?.on('chat', (data) => {
            console.log('mensagem enviada ', data)
            setChat((prevState) => [...prevState, data])
        })
    }, [socket]);

    function sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (currentMsg.current && currentMsg.current?.value !== '') {
            const sendMsgToServer = {
                message: currentMsg.current?.value,
                username: 'Alexia Kattah',
                roomId,
                time: new Date().toLocaleTimeString()
            };

            let e = socket?.emit('chat', sendMsgToServer);
            console.log('emitido o evento', e)

            setChat((prevState) => [...prevState, sendMsgToServer])

            currentMsg.current.value = '';
        }
    }

    return (
        <div className="bg-gray-900 px-4 pt-4 md:w-[15%] hidden md:flex rounded-md m-3 h-full">
            <div className="relative h-full w-full">

                {chat.map((msg, index) => {
                    return (
                        <div className="bg-gray-950 rounded p-2" key={index}>
                            <div className="flex items-center text-pink-400 space-x-2 mb-4">
                                <span>{msg.username}</span>
                                <span>{msg.time}</span>
                            </div>
                            <div className="mt-5 text-sm">
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    )
                })}


                <form className="absolute bottom-2 w-full" onSubmit={(event) => sendMessage(event)}>
                    <div className="flex relative ">
                        <input
                            type="text"
                            name=""
                            id=""
                            ref={currentMsg}
                            className="px-3 py-2 bg-gray-950 rounded-md w-full"
                        />
                        <button type="submit">
                            <Image
                                className="absolute right-2 top-2.5 cursor-pointer"
                                src="/send.svg"
                                width={20}
                                height={20}
                                alt="Send"
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
