import { useContext } from "react";
import { PopupContext } from "../context/popups";

export const Popups = {
    Login: 'login',
    Register: 'register',
    Logout: 'logout',
    EditUser: 'edit user',
    AddActivity: 'add activity',
    Followers: 'followers',
    Follows: 'follows',
    CreateContent: 'create content',
    EditActivity: 'edit activity',
    AddPost: 'add post',
    FindUser: 'find user',
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