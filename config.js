// COLORS
export const DEFAULT_COLOR = '#5F706D'
export const PRIMARY_COLOR = '#17aa5a'
export const SECONDARY_COLOR = '#CC780A'

// NAME
export const APP_NAME = 'GOROUTE'

// API
const API_ORIGIN = import.meta.env.VITE_APP_API_ORIGIN

// USER ENDPOINTS
export const USER_ENDPOINT = `${API_ORIGIN}/user`
export const REGISTER_ENDPOINT = `${API_ORIGIN}/userRegister`
export const EDIT_USER_ENDPOINT = `${API_ORIGIN}/userUpdate`
export const LOGIN_ENDPOINT = `${API_ORIGIN}/login`
export const LOGOUT_ENDPOINT = `${API_ORIGIN}/logout`
export const USER_FOLLOW_ENDPOINT = `${API_ORIGIN}/userFollow`
export const USER_UNFOLLOW_ENDPOINT = `${API_ORIGIN}/userUnfollow`

// ACTIVITY ENDPOINTS
export const GET_USER_ACTIVITIES_ENDPOINT = `${API_ORIGIN}/yourActivities`
export const GET_ACTIVITIES_FEED_ENDPOINT = `${API_ORIGIN}/activities`
export const ADD_ACTIVITY_ENDPOINT = `${API_ORIGIN}/activityRegister`
export const SUGGESTED_USERS_BY_ACTIVITY = `${API_ORIGIN}/suggestedUsersByActivity`

// SPORTS ENDPOINTS
export const GET_SPORTS_ENDPOINT = `${API_ORIGIN}/sports`
