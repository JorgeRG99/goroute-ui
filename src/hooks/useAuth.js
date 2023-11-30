import { useContext, useEffect } from 'react';
import { REGISTER_ENDPOINT, LOGIN_ENDPOINT } from '../../config'
import { getFromStorage, storage } from '../services/storage';
import { AuthContext } from '../context/auth';

export const useAuth = () => {
    const { authToken, setAuthToken } = useContext(AuthContext);

    useEffect(() => {
        if (!authToken) setAuthToken(getFromStorage("AuthToken"));

      }, [setAuthToken, authToken]);

    const register = async ( userData ) => {
        try {
            const res = await fetch(REGISTER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`);
            return await res.json();
        } catch (error) {
            throw new Error(`Error en el registro de usuario ${error.message}`);
        } 
    }

    const login = async ( userCredentials ) => {
        try {
            const res = await fetch(LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });

            if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`);

            const response = await res.json()

            storage({
                name: "AuthToken",
                value: response.token,
              });

              setAuthToken(response.token)

        } catch (error) {
            throw new Error(`Error en el login de usuario ${error.message}`);
        }
    }


    return { register, login, authToken }
}