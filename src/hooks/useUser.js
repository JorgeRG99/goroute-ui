import { useContext, useEffect } from 'react';
import { USER_ENDPOINT } from '../../config'
import { UserContext } from '../context/user';
import { useAuth } from './useAuth';

export const useUser = () => {
    const { userData, setUserData } = useContext(UserContext);
    const { authToken } = useAuth();

    useEffect(() => {
        if (authToken) {
            const getUserData = async () => {
                setUserData(await user(authToken))
            }
            getUserData()
        }

      }, [authToken, setUserData]);

    const user = async (authToken) => {
        try {
            const res = await fetch(USER_ENDPOINT, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
            });
            if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

            return await res.json();
        } catch (error) {
            throw new Error(`Error en el registro de usuario ${error.message}`);
        } 
    }

    return { user, userData }
}