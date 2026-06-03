'use client'
import { v4 as uuidv4 } from 'uuid';
import {useEffect} from "react";


export default function ClientIdProvider() {

    useEffect(() =>{
        const existing = localStorage.getItem('clientId')
        if (!existing) {
            localStorage.setItem('clientId',uuidv4())
        }
    },[])

    return null;
}