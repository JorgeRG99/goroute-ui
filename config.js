const API_ORIGIN = import.meta.env.VITE_APP_API_ORIGIN

// USER ENDPOINTS
export const USER_ENDPOINT = `${API_ORIGIN}/user`
export const REGISTER_ENDPOINT = `${API_ORIGIN}/userRegister`
export const EDIT_USER_ENDPOINT = `${API_ORIGIN}/userUpdate`
export const LOGIN_ENDPOINT = `${API_ORIGIN}/login`
export const LOGOUT_ENDPOINT = `${API_ORIGIN}/logout`

// ACTIVITY ENDPOINT
export const GET_USER_ACTIVITIES_ENDPOINT = `${API_ORIGIN}/yourActivities`