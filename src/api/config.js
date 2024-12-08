export const BASE_URL = "http://localhost:9999";
export const USER_LOGIN = `${BASE_URL}/auth/login`;
export const USER_LOGOUT = `${BASE_URL}/auth/logout`;
export const USER_REGISTER = `${BASE_URL}/auth/register`;
export const GET_USER_PROFILE = `${BASE_URL}/auth/user`;
export const REISSUE_TOKEN = `${BASE_URL}/auth/reissue-token`;
export const POST_GET_ID_BY_EMAIL = `${BASE_URL}/send-user-id`;
export const POST_RESET_PASSWORD = `${BASE_URL}/reset-password`;
export const KAKAO_LOGIN = `${BASE_URL}/auth/login/kakao`;
export const CHECK_UNIQUE = `${BASE_URL}/auth/check-unique`;
export const GET_TERMS = `${BASE_URL}/auth/terms`;
export const CREATE_CHATROOM = `${BASE_URL}/chat/chatroom`;
export const CREATE_MEETROOM = `${BASE_URL}/chat/meetroom`;
export const GET_CHATROOM_BY_USER_ID = `${BASE_URL}/chat/chatroom`;
export const GET_MEETROOM_BY_USER_ID = `${BASE_URL}/chat/meetroom`;
export const GET_CHAT_BY_CHATROOM_ID = `${BASE_URL}/chat`;
export const SOCKET_URL = `${BASE_URL}/chat`;
export const VIDEO_SOCKET_URL = `${BASE_URL}/video`;
export const GROUPCALL_SOCKET_URL = `${BASE_URL}/groupcall`;
export const USER_REGISTER_SPECIFIC = `${BASE_URL}/auth/register/specific`;
