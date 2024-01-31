'use client'
import Chat from '@/components/Chat';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useContext, useEffect, useRef} from "react";
import {SocketContext} from "@/contexts/SocketContext";

export default function Room({params}: { params: { id: string } }) {
    const {socket} = useContext(SocketContext)
    const localStream = useRef<HTMLVideoElement>();


    useEffect(() => {
        // Todos os nomes de eventos precisam ser o mesmo nome do evento no servidor em src/app/ts na pasta de back end
        socket?.on('connect', async () => {
            console.log('connected no front')
            socket?.emit('subscribe', {
                roomId: params.id, // isso é o id da rota que é passado como parâmetro na url room/[id]
                socketId: socket.id,
            });
            await initCamera();
        });
    }, [socket]);

    const initCamera = async () => {
        const video = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
            }
        });

        if (localStream.current) localStream.current.srcObject = video;
    }

  return (
      <div className="h-screen">
        <Header/>
        <div className="flex h-[80%] ">
          <div className="md:w-[85%] w-full m-3 ">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div className="bg-gray-950 w-full rounded-md h-full p-2 relative ">
                  <video className="h-full w-full" ref={localStream} autoPlay playsInline/>
                <span className="absolute bottom-3">Alexia Kattah</span>
              </div>
            </div>
          </div>
            <Chat roomId={params.id}/>
        </div>
        <Footer/>
      </div>
  );
}
