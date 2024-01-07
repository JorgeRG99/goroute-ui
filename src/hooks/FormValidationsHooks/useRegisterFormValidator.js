import { useMemo, useState } from "react";
import { EMPTY_VALUES_ERROR, GENERAL_SERVER_ERROR } from "../../../config";

export const useRegisterFormValidator = (registerData) => {
    const [serverErrors, setServerErrors] = useState();
    const validateUsername = (value) => value.match(/^[a-zA-Z0-9_]{3,20}$/);
    const validateEmail = (value) => value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    const validateNameSurname = (value) => value.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/);
    const validatePassword = (value) => value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    const validatePasswordConfirm = (value) => value === registerData.password;
    const validateBirthDate = (value) => {
        const birthDate = new Date(value);
        const currentDate = new Date();
        const minAge = 5;

        const minBirthDate = new Date(
            currentDate.getFullYear() - minAge,
            currentDate.getMonth(),
            currentDate.getDate()
        );

        return birthDate <= minBirthDate;
    }

    const isUsernameInvalid = useMemo(() => {
        if (registerData.username === "") return false;

        return validateUsername(registerData.username) ? false : true;
    }, [registerData.username]);

    const isEmailInvalid = useMemo(() => {
        if (registerData.email === "") return false;

        return validateEmail(registerData.email) ? false : true;
    }, [registerData.email]);

    const isNameInvalid = useMemo(() => {
        if (registerData.name === "") return false;

        return validateNameSurname(registerData.name) ? false : true;
    }, [registerData.name]);

    const isSurnameInvalid = useMemo(() => {
        if (registerData.surname === "") return false;

        return validateNameSurname(registerData.surname) ? false : true;
    }, [registerData.surname]);

    const isPasswordInvalid = useMemo(() => {
        if (registerData.password === "") return false;

        return validatePassword(registerData.password) ? false : true;
    }, [registerData.password]);

    const isPasswordConfirmInvalid = useMemo(() => {
        if (registerData.passwordConfirm === "") return false;

        return validatePasswordConfirm(registerData.passwordConfirm) ? false : true;
    }, [registerData.passwordConfirm]);

    const isBirthDateInvalid = useMemo(() => {
        if (registerData.birth === "") return false;

        return validateBirthDate(registerData.birth) ? false : true;
    }, [registerData.birth]);

    const catchedServerErrors = (response) => {
        if (response > 299 && response > 499)  {
            setServerErrors(GENERAL_SERVER_ERROR)

            return true
        }
    }

    const catchEmptyValues = () => {
        if (Object.values(registerData).some(data => data.length === 0)) {
            setServerErrors(EMPTY_VALUES_ERROR)

            return true;
        }
    }

    return { isUsernameInvalid, isEmailInvalid, isNameInvalid, isSurnameInvalid, isPasswordInvalid, isPasswordConfirmInvalid, isBirthDateInvalid, catchedServerErrors, serverErrors, catchEmptyValues }
}
