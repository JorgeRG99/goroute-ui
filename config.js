//COPYRIGHT
export const COPYRIGHT = "© 2023 GoRoute from GoRoute-Group"

//ICONS SIZE
export const LIKE_MEDIUM_SIZE = "24"
export const LIKE_SMALL_SIZE = "18"

// COLORS
export const DEFAULT_COLOR = '#5F706D'
export const PRIMARY_COLOR = '#17aa5a'
export const SECONDARY_COLOR = '#CC780A'
export const TERTIARY_COLOR = '#9b4ae8'
export const SUCCESS_COLOR = '#09f'


// NAME
export const APP_NAME = 'GOROUTE'

// API
const API_ORIGIN = import.meta.env.VITE_APP_API_ORIGIN

// USER ENDPOINTS
export const USER_ENDPOINT = `${API_ORIGIN}/user`
export const USER_BY_USERNAME_ENDPOINT = `${API_ORIGIN}/userByUsername`
export const FIND_USER_BY_PARTIAL_USERNAME_ENDPOINT = `${API_ORIGIN}/findUsersByPartialUsername`
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
export const SUGGESTED_USERS_ENDPOINT = `${API_ORIGIN}/suggestedUsersBy`

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
export const EDIT_ACTIVITY_ENDPOINT = `${API_ORIGIN}/activityUpdate`
export const DELETE_ACTIVITY_ENDPOINT = `${API_ORIGIN}/activityDelete`

// SPORTS ENDPOINTS
export const GET_SPORTS_ENDPOINT = `${API_ORIGIN}/sports`

// POSTS ENDPOINTS
export const GET_YOUR_POSTS_ENDPOINT = `${API_ORIGIN}/yourPosts`
export const GET_POSTS_FEED_ENDPOINT = `${API_ORIGIN}/posts`
export const GET_USER_POSTS_ENDPOINT = `${API_ORIGIN}/postsByUser`
export const ADD_POST_ENDPOINT = `${API_ORIGIN}/postRegister`
export const SUGGESTED_USERS_BY_POSTS = `${API_ORIGIN}/suggestedUsersByPosts`
export const GET_POST_LIKES_ENDPOINT = `${API_ORIGIN}/postLikes`
export const LIKE_POST_ENDPOINT = `${API_ORIGIN}/postLike`
export const UNLIKE_POST_ENDPOINT = `${API_ORIGIN}/postUnlike`
export const EDIT_POST_ENDPOINT = `${API_ORIGIN}/postUpdate`
export const DELETE_POST_ENDPOINT = `${API_ORIGIN}/postDelete`

// COMMENTS RELATED ROUTES
export const GET_LAST_COMMENT_ENDPOINT = `${API_ORIGIN}/getLastComment`
export const ADD_COMMENT_ENDPOINT = `${API_ORIGIN}/commentRegister`
export const MORE_COMMENTS_ENDPOINT = `${API_ORIGIN}/moreComments`
export const DELETE_COMMENT_ENDPOINT = `${API_ORIGIN}/commentDelete`
export const LIKE_COMMENT_ENDPOINT = `${API_ORIGIN}/commentLike`
export const UNLIKE_COMMENT_ENDPOINT = `${API_ORIGIN}/commentUnlike`

// ERRORS
export const GENERAL_SERVER_ERROR = "No se pudo completar la operación debido a un error. Por favor, verifica tu conexión a internet y vuelve a intentarlo más tarde."
export const EMPTY_VALUES_ERROR = "Por favor, asegúrate de rellenar todos los campos antes de continuar. "
export const USER_NOT_FOUND_ERROR = "Usuario no encontrado"
export const INVALID_CREDENTIALS_ERROR = "Email o contraseña incorrectos"

// USER REGEX
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
export const NAME_SURNAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/
export const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
export const BIOGRAPHY_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,¿?!¡\-_%&/\s]{0,200}$/


// ACTIVITY REGEX
export const ACTVITY_TITLE_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,¿?!¡\-_%&/\s]{10,50}$/
export const ACTVITY_DESCRIPTION_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,¿?!¡\-_%&/\s]{10,220}$/
export const ACTVITY_PARTICPANTS_REGEX = /^[0-9]{1,2}$/
export const ACTVITY_LOCATION_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,\s]{0,100}$/

// POSTS REGEX
export const POST_TITLE_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,¿?!¡\-_%&/\s]{10,100}$/
export const POST_CONTENT_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,¿?!¡\-_%&/\s]{10,3000}$/
export const POST_TAGS_REGEX = /^#(\w+)(#\w+)*$/
export const POST_COMMENT_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,¿?!¡\-_%&/\s]{10,150}$/


// USER CARD SIZES
export const USER_CARD_SMALL_SIZE = 'sm'
export const USER_CARD_MEDIUM_SIZE = 'md'
export const USER_CARD_BIG_SIZE = 'lg'