import { RootStackParamsList } from "../types/global"

// eslint-disable-next-line prettier/prettier
const ROUTER: { [K in keyof RootStackParamsList]: K } = {
    Home: 'Home',
    SignIn: 'SignIn',
    SignOut: 'SignOut',
    SplashScreen: 'SplashScreen',
}

const QUERY_CACHE_KEYS = {
    books:'books'
}

const STATUS_QUERY = {
    success: 'success',
    error: 'error',
    pending: 'pending',
}

const STORAGE_KEY = {
    token: 'token',
    deviceData: 'deviceData',
    user: 'user',
    deviceUUID:'deviceUUID',
    deviceRegistered:"deviceRegistered"
}

const PATTERNS ={
    email: /^[a-zA-Z0-9.-]+@([a-zA-Z0-9-]+.){1,}[a-zA-Z]{2,16}$/,
    username: /^[a-zA-Z][a-zA-Z0-9]{2,19}$/,
    password: /^[a-zA-Z0-9.,?!@#$%^&*+-]{5,32}$/
}

export { QUERY_CACHE_KEYS, STATUS_QUERY, STORAGE_KEY, ROUTER,PATTERNS }
