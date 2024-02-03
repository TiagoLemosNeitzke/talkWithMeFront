'use client'

import {FormEvent, useRef} from 'react';
import Button from './Button';
import {Input} from './Input';
import {useRouter} from "next/navigation";

export default function CreateRoom() {
    const name = useRef<HTMLInputElement>(null);
    const router = useRouter();

    function handleCreateRoom(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (name.current && name.current?.value !== '') {
            sessionStorage.setItem('username', name.current.value)
            const roomId = generateRoomId()
            console.log('sala criada roomId => ', roomId)
            router.push(`/room/${roomId}`)
        }
    }

    function generateRoomId() {
        return Math.random().toString(36).substring(2, 7);
    }

    return (
        <form onSubmit={(event) => handleCreateRoom(event)}>
            <div className="h-48 flex flex-col space-y-10 relative">
                <Input placeholder="Seu nome" type="text" ref={name}/>

                <div className="-bottom-2 absolute w-full">
                    <Button title="Entrar" type="submit"/>
                </div>
            </div>
        </form>
    );
}
