import React, { useEffect, useState } from 'react'
import { View, StatusBar, ActivityIndicator, Animated, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../../context/AuthContext'
import { fetchDeviceRegistration, fetchUserInfo } from '../../services/api'
import { ROUTER, STORAGE_KEY } from '../../utils/constants'

const SplashScreen: React.FC = ({ navigation }: any) => {
    const { signIn } = useAuth()
    const [fadeAnim] = useState(new Animated.Value(0))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initializeApp = async () => {
        try {
            let deviceRegistered = await AsyncStorage.getItem('deviceRegistered')
            if (!deviceRegistered) {
                const device = await fetchDeviceRegistration('example', 'exampletrue')
                await AsyncStorage.setItem(STORAGE_KEY.deviceRegistered, JSON.stringify(device))
                await AsyncStorage.setItem(STORAGE_KEY.deviceUUID, device.uuid)
            }

            const token = await AsyncStorage.getItem(STORAGE_KEY.token)
            if (token) {
                const userInfo = await fetchUserInfo(token)
                signIn(token, userInfo)
                navigation.navigate(ROUTER.Home)
            } else {
                navigation.navigate(ROUTER.SignIn)
            }
        } catch (error) {
            console.error('Error during initialization', error)
        }
    }

    useEffect(() => {
        initializeApp()

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }, [fadeAnim, initializeApp])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#007bff' />
            <Animated.View style={{ opacity: fadeAnim }}>
                <ActivityIndicator size='large' color='#fff' />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
    },
})

export default SplashScreen
