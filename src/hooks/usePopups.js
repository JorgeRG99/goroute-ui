import { useContext } from "react";
import { PopupContext } from "../context/popups";

export function usePopups() {
    const { popups, setPopups } = useContext(PopupContext)

    const displayLoginPopup = () => {
        setPopups(prevState => ({
            ...prevState,
            isLoginPopupOpen: !popups.isLoginPopupOpen
        }))
    };
    
    const displayRegisterPopup = () => {
        setPopups(prevState => ({
            ...prevState,
            isRegisterPopupOpen: !popups.isRegisterPopupOpen
        }))
    };

    return { popups, setPopups, displayLoginPopup, displayRegisterPopup}
}