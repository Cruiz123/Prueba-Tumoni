// src/services/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL } from '../utils'
import { SignInFormData, SignOutFormData } from '../types/screenTypes'
import { Alert } from 'react-native'

let cachedUUID: string | null = null

export const getDeviceUUID = async () => {
    if (cachedUUID) {
        return cachedUUID
    }
    cachedUUID = await AsyncStorage.getItem('deviceUUID')
    return cachedUUID
}

const handleFetchResponse = async (response: Response) => {
    const responseData = await response.json()
    if (!response.ok) {
        throw new Error(responseData.message || 'Unknown error')
    }

    if (response.status === 401) {
        // Token has expired or is invalid
        Alert.alert('Session Expired', 'Your session has expired. Please log in again.')
        await AsyncStorage.clear()
        throw new Error('Session expired')
    }
    return responseData
}

const getHeaders = async (isAuth: boolean = false, token?: string) => {
    const uuid = await getDeviceUUID()
    const headers: any = {
        'Content-Type': 'application/json',
        'Device-UUID': String(uuid),
    }
    if (isAuth && token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return headers
}

export const fetchDeviceRegistration = async (brand: string, model: string) => {
    const response = await fetch(`${BASE_URL}/device/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brand, model }),
    })
    return handleFetchResponse(response)
}

export const fetchSignUp = async ({ username, email, password }: SignOutFormData) => {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify({ username, email, password }),
    })

    return handleFetchResponse(response)
}

export const fetchSignIn = async ({ username, password }: SignInFormData) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify({ username, password }),
    })

    return handleFetchResponse(response)
}

export const fetchUserInfo = async (token: string) => {
    const uuid = await getDeviceUUID()
    const response = await fetch(`${BASE_URL}/user/info`, {
        method: 'GET',
        headers: {
            'Device-UUID': String(uuid),
            Authorization: `Bearer ${token}`,
        },
    })

    return handleFetchResponse(response)
}

export const fetchBookList = async (token: string) => {
    const uuid = await getDeviceUUID()
    const response = await fetch(`${BASE_URL}/book/list`, {
        method: 'GET',
        headers: {
            'Device-UUID': String(uuid),
            Authorization: `Bearer ${token}`,
        },
    })
    return handleFetchResponse(response)
}
