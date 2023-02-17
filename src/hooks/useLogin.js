import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null) 
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        const json = await res.json() 

        if (!res.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(json)) 
            dispatch({type: 'LOGIN', payload: json}) 
            setIsLoading(false)
        }

    }

    return { login, isLoading, error }
}
