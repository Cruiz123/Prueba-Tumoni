/* eslint-disable react-native/no-inline-styles */

import React from 'react'
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { fetchUserInfo } from '../../services/api'
import { FormInput, TextBottom } from '../../components'
import { SignInFormData } from '../../types/screenTypes'
import { fetchSignIn } from '../../services/api'
import { useMutation } from '@tanstack/react-query'
import { RootStackParamsList } from '../../types/global'
import { PATTERNS, ROUTER } from '../../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLoading } from '../../context/LoaderContext'
import useStyles from '../../hooks/useStyles'
import styled from './styled'
import { COLORS, FONTS, SIZES } from '../../utils/theme'

type Props = NativeStackScreenProps<RootStackParamsList, 'SignIn'>

const SignInScreen = ({ navigation }: Props) => {
    const { signIn } = useAuth()
    const { setLoading } = useLoading()
    const styles = useStyles(styled)

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<SignInFormData>()

    const { mutate: SignInMutation, isLoading } = useMutation(fetchSignIn, {
        onSuccess: async (data) => {
            const token = data.token
            const userInfo = await fetchUserInfo(token)
            signIn(token, userInfo)
            navigation.navigate(ROUTER.Home)
            setLoading(false)
        },
        onError: async (error: any) => {
            if (error.status === 401) {
                await AsyncStorage.removeItem('user')
                await AsyncStorage.removeItem('token')
            }
            setLoading(false)
        },
    })

    const onSubmit = async (data: SignInFormData) => {
        setLoading(true)
        SignInMutation(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView style={[styles.containerKeyboard]} keyboardDismissMode='interactive'>
                <View style={styles.containerText}>
                    <Text style={styles.legendTitles}>Login here</Text>
                    <Text style={styles.legendSubTitle}>Welcome back you`ve been missed!</Text>
                </View>
                <Controller
                    control={control}
                    name='username'
                    rules={{
                        required: { value: true, message: 'Username is required' },
                        pattern: {
                            value: PATTERNS.username,
                            message: 'Invalid username',
                        },
                        minLength: {
                            value: 3,
                            message: 'Minimum number of characters must be 3',
                        },
                        maxLength: {
                            value: 20,
                            message: 'Maximum number of characters must be 20',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <FormInput
                            placeholder='Username'
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            errorMsg={error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='password'
                    rules={{
                        required: { value: true, message: 'Password is required' },
                        pattern: {
                            value: PATTERNS.password,
                            message: 'Invalid password',
                        },
                        minLength: {
                            value: 5,
                            message: 'Minimum number of characters must be 5',
                        },
                        maxLength: {
                            value: 32,
                            message: 'Maximum number of characters must be 32',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <FormInput
                            placeholder='Password'
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            secureTextEntry
                            errorMsg={error?.message}
                        />
                    )}
                />
                <View style={{ marginTop: 60 }}>
                    <TextBottom
                        label='Sign In'
                        disabled={!isValid}
                        buttonContainerStyle={{
                            height: 50,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            elevation: 5,
                            shadowColor: COLORS.primaryColor,
                            // shadowRadius: 10,
                            backgroundColor: !isValid ? COLORS.secondaryColor : COLORS.primaryColor,
                            flexDirection: 'row',
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            fontWeight: 'bold',
                        }}
                        onPress={handleSubmit(onSubmit)}>
                        {isLoading && <ActivityIndicator size='small' color='#fff' />}
                    </TextBottom>
                </View>
                <View style={styles.containerSingUp}>
                    <TextBottom
                        label='Create new account'
                        buttonContainerStyle={{
                            backgroundColor: undefined,
                            marginTop: 60,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            color: COLORS.primaryColor,
                            fontWeight: 'bold',
                        }}
                        onPress={() => navigation.navigate(ROUTER.SignOut)}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default SignInScreen
