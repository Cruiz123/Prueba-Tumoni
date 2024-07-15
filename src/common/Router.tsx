import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, SignInScreen, SignOutScreen, SplashScreen } from '../views'

import { useAuth } from '../context/AuthContext'

import { RootStackParamsList } from '../types/global'
import { ROUTER } from '../utils/constants'
import { Loader } from '../components'

const Stack = createNativeStackNavigator<RootStackParamsList>()

const AppNavigator = () => {
    const { isAuthenticated } = useAuth()
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isAuthenticated ? (
                        <>
                            <Stack.Screen name={ROUTER.Home} component={HomeScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name={ROUTER.SplashScreen} component={SplashScreen} />
                            <Stack.Screen name={ROUTER.SignIn} component={SignInScreen} />
                            <Stack.Screen name={ROUTER.SignOut} component={SignOutScreen} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            <Loader />
        </>
    )
}

export default AppNavigator
