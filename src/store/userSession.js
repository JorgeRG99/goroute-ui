import { create } from "zustand";
import { deleteFromStorage, getFromStorage, storage } from "../services/storage";
import { user, userLogin, userLogout, userRegister} from "../services/user";
import { getUserCreationDate } from "../services/helpers";

export const useUserSessionStore = create((set, get) => {
    //TODO: DO BETTER PRACTICES SHIT!!!!!
    const authToken = getFromStorage('AuthToken') || null;

    const restoreUserSession = async () => {
        if (authToken) {
            try {
                const userData = await user(authToken);
                const userSince = getUserCreationDate(userData.created_at.slice(0, 10))
                
                set({ userData: userData, isLoading: false, userSince: userSince });
            } catch (error) {
                console.error(`Error obteniendo datos del usuario ${error.message}`);
            }
        }
    }

    restoreUserSession()

    return {
        authToken: getFromStorage('AuthToken') || null,
        isAuthenticated: getFromStorage('AuthToken') ? true : false,
        isLoading: true,
        userData: null,
        userSince: null,

        register: async (userData) => {
            try {
                return await userRegister(userData)
            } catch (error) {
                throw new Error(`Error en el registro de usuario ${error.message}`);
            }
        },

        login: async (userCredentials) => {
            try {
                const { setUserSessionData } = get()
                const response = await userLogin(userCredentials)

                set({ authToken: response.token, isAuthenticated: true })

                storage({
                    name: "AuthToken",
                    value: response.token,
                });

                setUserSessionData()
            } catch (error) {
                throw new Error(`Error iniciando la sesion ${error.message}`);
            }
        },

        logout: async () => {
            try {
                const { authToken } = get()
                userLogout(authToken);

                set({ authToken: null, isAuthenticated: false, userData: null, isLoading:true })

                deleteFromStorage('AuthToken')
            } catch (error) {
                throw new Error(`Error cerrando la sesion ${error.message}`);
            }
        },

        setUserSessionData: async () => {
            try {
                const { authToken } = get()
                const userData = await user(authToken)

                set({ userData: userData, isLoading: false })
            } catch (error) {
                throw new Error(`Error obteniendo datos del ususario ${error.message}`);
            }
        },

        updateUserData: (updatedData) => {
            const { userData } = get()

            const cleanData = Object.fromEntries(Object.entries(updatedData).filter(value => value[1] !== undefined))

            const updatedUser = {
                ...userData,
                ...cleanData
            }

            set({ userData: updatedUser })
        },
    }
})