import { useContext, useEffect } from 'react';
import { userLogin, userLogout, userRegister, user, userEdit } from '../services/user'
import { getFromStorage, storage, deleteFromStorage } from '../services/storage';
import { UserContext } from '../context/user';

export const useAuth = () => {
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        const userAuthToken = getFromStorage("AuthToken")

        if (userAuthToken) {
            const updateUserData = async () => {
                const userNewData = await user(userAuthToken)

                setUserData({
                    authToken: userAuthToken,
                    ...userNewData,
                    followers: JSON.parse(userNewData.followers),
                    follows: JSON.parse(userNewData.follows),
                });
            }

            updateUserData();
        }
    }, [setUserData]);

    const register = async (userData) => {
        try {
            return await userRegister(userData)
        } catch (error) {
            throw new Error(`Error en el registro de usuario ${error.message}`);
        }
    }

    const editUser = async (newData) => {
        try {
            const data = Object.fromEntries(Object.entries(newData).filter(value => value[1] !== undefined))
            const res =  await userEdit(data, userData.authToken)

            setUserData(prevState => ({
                ...prevState,
                ...data,
            }))

            return res
        } catch (error) {
            throw new Error(`Error en el registro de usuario ${error.message}`);
        }
    }

    const login = async (userCredentials) => {
        try {
            const response = await userLogin(userCredentials)

            storage({
                name: "AuthToken",
                value: response.token,
            });

            const userNewData = await user(response.token)

            setUserData({
                ...userNewData,
                authToken: response.token
            })

        } catch (error) {
            throw new Error(`Error en el login de usuario ${error.message}`);
        }
    }

    const logout = async () => {
        try {
            userLogout(userData.authToken);

            deleteFromStorage('AuthToken')

            setUserData({
                id: null,
                authToken: null,
                username: null,
                name: null,
                surname: null,
                email: null,
                password: null,
                birth: null,
                avatar: null,
                biography: null
            })


        } catch (error) {
            throw new Error(`Error en el login de usuario ${error.message}`);
        }
    }


    return { register, login, logout, editUser, userData }
}