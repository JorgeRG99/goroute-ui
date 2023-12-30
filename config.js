//COPYRIGHT
export const COPYRIGHT = "© 2023 GoRoute from GoRoute-Group"

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
export const USER_BY_USERNAME_ENDPOINT = `${API_ORIGIN}/userByUsername`
export const USER_BY_ID_ENDPOINT = `${API_ORIGIN}/userById`
export const REGISTER_ENDPOINT = `${API_ORIGIN}/userRegister`
export const EDIT_USER_ENDPOINT = `${API_ORIGIN}/userUpdate`
export const LOGIN_ENDPOINT = `${API_ORIGIN}/login`
export const LOGOUT_ENDPOINT = `${API_ORIGIN}/logout`
export const USER_FOLLOWS_ENDPOINT = `${API_ORIGIN}/userFollows`
export const USER_FOLLOWERS_ENDPOINT = `${API_ORIGIN}/userFollowers`
export const USER_FOLLOW_ENDPOINT = `${API_ORIGIN}/userFollow`
export const USER_UNFOLLOW_ENDPOINT = `${API_ORIGIN}/userUnfollow`
export const USER_REMOVE_FOLLOWER_ENDPOINT = `${API_ORIGIN}/followerRemove`
export const USER_JOINED_ACTIVITIES_ENDPOINT = `${API_ORIGIN}/userJoinedActivities`

// ACTIVITY ENDPOINTS
export const GET_YOUR_ACTIVITIES_ENDPOINT = `${API_ORIGIN}/yourActivities`
export const GET_USER_ACTIVITIES_ENDPOINT = `${API_ORIGIN}/activitiesByUser`
export const GET_ACTIVITIES_FEED_ENDPOINT = `${API_ORIGIN}/activities`
export const GET_ACTIVITY_LIKES_ENDPOINT = `${API_ORIGIN}/activityLikes`
export const LIKE_ACTIVITY_ENDPOINT = `${API_ORIGIN}/activityLike`
export const UNLIKE_ACTIVITY_ENDPOINT = `${API_ORIGIN}/activityUnlike`
export const GET_ACTIVITY_PARTICIPANTS_ENDPOINT = `${API_ORIGIN}/participants`
export const ADD_PARTICIPANT_ENDPOINT = `${API_ORIGIN}/participantAdd`
export const REMOVE_PARTICIPANT_ENDPOINT = `${API_ORIGIN}/participantRemove`
export const ADD_ACTIVITY_ENDPOINT = `${API_ORIGIN}/activityRegister`
export const SUGGESTED_USERS_BY_ACTIVITY = `${API_ORIGIN}/suggestedUsersByActivity`
export const EDIT_ACTIVITY_ENDPOINT = `${API_ORIGIN}/activityUpdate`
export const DELETE_ACTIVITY_ENDPOINT = `${API_ORIGIN}/activityDelete`

// SPORTS ENDPOINTS
export const GET_SPORTS_ENDPOINT = `${API_ORIGIN}/sports`
