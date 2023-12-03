import { useContext } from "react";
import { PopupContext } from "../context/popups";

export const Popups = {
    Login: 'login',
    Register: 'register',
    Logout: 'logout',
    Edit: 'edit user'
}

export function usePopups() {
    const { popups, setPopups } = useContext(PopupContext)
    
    const togglePopup = (popup) => {
        setPopups(prevState => ({
            ...prevState,
            [popup]: !popups[popup]
        }))
    };

    return { popups, setPopups, togglePopup }
}