'use client'


import {useEffect, useState} from "react";

export default function History(){

    const [history, setHistory] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();

    async function fetchHistory (clientId :string){
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${clientId}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setHistory(data);
        setLoading(false)
    }
    useEffect(() => {
        const existingId = localStorage.getItem("clientId");
        if(existingId){
            fetchHistory(existingId);
        } else{
            setError(`Could not history data for client with id ${existingId}`);
        }

    }, []); //[] run once


    return(
        <>
        </>
    )
}