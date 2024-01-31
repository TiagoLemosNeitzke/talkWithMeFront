'use client'

import {FormEvent, useRef} from 'react';
import Button from './Button';
import {Input} from './Input';
import {useRouter} from "next/navigation";

export default function JoinRoom() {
    const name = useRef<HTMLInputElement>(null);
    const id = useRef<HTMLInputElement>(null);
    const router = useRouter();

    function handleJoinRoom(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (name.current && name.current?.value !== '' && id.current && id.current?.value !== '') {
            sessionStorage.setItem('username', name.current.value)
            const roomId = id.current.value
            window.location.href = `/room/${roomId}`
        }
    }

    return (
        <form onSubmit={(event) => handleJoinRoom(event)}>
            <div className="h-48 flex flex-col space-y-10 relative">
                <Input placeholder="Seu nome" type="text" ref={name}/>
                <Input placeholder="ID da reunião" type="text" ref={id}/>
                <Button title="Entrar" type="submit"/>
            </div>
        </form>
    );
}
