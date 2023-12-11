import { USER_FOLLOW_ENDPOINT, REGISTER_ENDPOINT, LOGIN_ENDPOINT, USER_ENDPOINT, LOGOUT_ENDPOINT, EDIT_USER_ENDPOINT, USER_UNFOLLOW_ENDPOINT } from '../../config'


export const user = async (authToken) => {
    try {
        const res = await fetch(USER_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response =  await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error en el registro de usuario ${error.message}`);
    }
}

export const userRegister = async (userData) => {
    try {
        const res = await fetch(REGISTER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`);

        const response = await res.json();

        return response;

    } catch (error) {
        throw new Error(`Error en el registro de usuario ${error.message}`);
    }
}

export const userLogin = async (userCredentials) => {
    try {
        const res = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials),
        });

        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`);

        const response = res.json()

        return response;

    } catch (error) {
        throw new Error(`Error en el login de usuario ${error.message}`);
    }
}

export const userLogout = async (authToken) => {
    try {
        const res = await fetch(LOGOUT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        })

        if (!res.ok) throw new Error(`Error en la solicitud ${res.json}`);

    } catch (error) {
        throw new Error(`Error en el login de usuario ${error.message}`);
    }
}

export const userEdit = async (newUserData, authToken) => {
    try {
        const res = await fetch(EDIT_USER_ENDPOINT, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserData),
        })

        if (!res.ok) throw new Error(`Error en la solicitud ${res.json}`);

    } catch (error) {
        throw new Error(`Error editando los datos del usuario ${error.message}`);
    }
}

export const userFollow = async (userToFollow, authToken) => {
    try {
        const res = await fetch(USER_FOLLOW_ENDPOINT, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userToFollow
            }),
        })

        if (!res.ok) throw new Error(`Error en la solicitud ${res.json}`);

    } catch (error) {
        throw new Error(`Error editando los datos del usuario ${error.message}`);
    }
}

export const userUnfollow = async (userToUnfollow, authToken) => {
    try {
        const res = await fetch(USER_UNFOLLOW_ENDPOINT, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userToUnfollow
            }),
        })

        if (!res.ok) throw new Error(`Error en la solicitud ${res.json}`);

    } catch (error) {
        throw new Error(`Error editando los datos del usuario ${error.message}`);
    }
}