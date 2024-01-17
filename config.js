//COPYRIGHT
export const COPYRIGHT = "© 2023 GoRoute from GoRoute-Group"

// PAGES URLs
export const PAGES_URLS = {
    home: '/',
    posts: '/posts',
    chats: '/messages',
    userChat: '/messages/:pathUsername',
    yourProfile: '/profile',
    othersProfile: '/:username',
    notFound: '*'
};

//ICONS SIZE
export const LIKE_MEDIUM_SIZE = "24"
export const LIKE_SMALL_SIZE = "18"

// COLORS
export const DEFAULT_COLOR = '#5F706D'
export const PRIMARY_COLOR = '#17aa5a'
export const SECONDARY_COLOR = '#CC780A'
export const TERTIARY_COLOR = '#a96de0'
export const SUCCESS_COLOR = '#09f'


// NAME
export const APP_NAME = 'GOROUTE'

// API
const API_ORIGIN = import.meta.env.VITE_APP_API_ORIGIN

// MIDDLEWARES
const API_MIDDLEWARE = '/api'

// USER ENDPOINTS
export const USER_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/user`
export const USER_BY_USERNAME_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userByUsername`
export const FIND_USER_BY_PARTIAL_USERNAME_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/findUsersByPartialUsername`
export const USER_BY_ID_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userById`
export const REGISTER_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userRegister`
export const EDIT_USER_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userUpdate`
export const LOGIN_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/login`
export const LOGOUT_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/logout`
export const USER_FOLLOWS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userFollows`
export const USER_FOLLOWERS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userFollowers`
export const USER_FOLLOW_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userFollow`
export const USER_UNFOLLOW_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userUnfollow`
export const USER_REMOVE_FOLLOWER_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/followerRemove`
export const USER_JOINED_ACTIVITIES_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/userJoinedActivities`
export const SUGGESTED_USERS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/suggestedUsersBy`

// ACTIVITY ENDPOINTS
export const GET_YOUR_ACTIVITIES_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/yourActivities`
export const GET_USER_ACTIVITIES_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/activitiesByUser`
export const GET_ACTIVITIES_FEED_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/activities`
export const GET_ACTIVITY_LIKES_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/activityLikes`
export const LIKE_ACTIVITY_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/activityLike`
export const UNLIKE_ACTIVITY_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/activityUnlike`
export const GET_ACTIVITY_PARTICIPANTS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/participants`
export const ADD_PARTICIPANT_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/participantAdd`
export const REMOVE_PARTICIPANT_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/participantRemove`
export const ADD_ACTIVITY_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/activityRegister`
export const EDIT_ACTIVITY_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/activityUpdate`
export const DELETE_ACTIVITY_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/activityDelete`

// SPORTS ENDPOINTS
export const GET_SPORTS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/sports`

// POSTS ENDPOINTS
export const GET_YOUR_POSTS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/yourPosts`
export const GET_POSTS_FEED_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/posts`
export const GET_USER_POSTS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/postsByUser`
export const ADD_POST_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/postRegister`
export const SUGGESTED_USERS_BY_POSTS = `${API_ORIGIN}${API_MIDDLEWARE}/suggestedUsersByPosts`
export const GET_POST_LIKES_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/postLikes`
export const LIKE_POST_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/postLike`
export const UNLIKE_POST_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/postUnlike`
export const EDIT_POST_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/postUpdate`
export const DELETE_POST_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/postDelete`

// COMMENTS RELATED ROUTES
export const GET_LAST_COMMENT_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/getLastComment`
export const ADD_COMMENT_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/commentRegister`
export const MORE_COMMENTS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/moreComments`
export const DELETE_COMMENT_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/commentDelete`
export const LIKE_COMMENT_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/commentLike`
export const UNLIKE_COMMENT_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/commentUnlike`

// CHATS RELATED ROUTES
export const GET_YOUR_CHATS_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/yourChats`
export const CHAT_WITH_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/chatWith`
export const SENT_CHAT_MESSAGE_ENDPOINT = `${API_ORIGIN}${API_MIDDLEWARE}/messageSent`


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