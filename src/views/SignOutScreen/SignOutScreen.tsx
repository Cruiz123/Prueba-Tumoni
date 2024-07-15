/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../context/AuthContext'
import { fetchSignUp, fetchSignIn, fetchUserInfo } from '../../services/api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../../types/global'
import { PATTERNS, ROUTER } from '../../utils/constants'
import { SignOutFormData } from '../../types/screenTypes'
import { FormInput, TextBottom } from '../../components'
import { useLoading } from '../../context/LoaderContext'
import useStyles from '../../hooks/useStyles'
import styled from './styled'
import { COLORS, FONTS, SIZES } from '../../utils/theme'

type Props = NativeStackScreenProps<RootStackParamsList, 'SignOut'>

const SignOutScreen = ({ navigation }: Props) => {
    const { signIn } = useAuth()
    const { setLoading } = useLoading()
    const styles = useStyles(styled)

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<SignOutFormData>()

    const signOutMutation = useMutation(fetchSignUp, {
        onSuccess: async (_, variables) => {
            const { username, password } = variables
            const signInData = await fetchSignIn({ username, password })
            const userInfo = await fetchUserInfo(signInData.token)
            signIn(signInData.token, userInfo)
            navigation.navigate(ROUTER.Home)
            setLoading(false)
        },
        onError: (error) => {
            console.error('Sign up failed', error)
            setLoading(false)
        },
    })

    const onSubmit = (data: SignOutFormData) => {
        setLoading(true)
        signOutMutation.mutate(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView style={[styles.containerKeyboard]} keyboardDismissMode='interactive'>
                <View style={styles.containerText}>
                    <Text style={styles.legendTitles}>Create account</Text>
                    <Text style={styles.legendSubTitle}>
                        Create an account so you can explore all the existing jobs
                    </Text>
                </View>
                <Controller
                    name='email'
                    rules={{
                        required: { value: true, message: 'email is required' },
                        pattern: {
                            value: PATTERNS.email,
                            message: 'Format email is invalid',
                        },
                    }}
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <FormInput
                            placeholder='Email'
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            errorMsg={error?.message}
                        />
                    )}
                />
                <Controller
                    name='username'
                    control={control}
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
                <View style={styles.containerSingUp}>
                    <TextBottom
                        label='Sign Up'
                        disabled={!isValid}
                        buttonContainerStyle={{
                            height: 50,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            elevation: 5,
                            shadowColor: COLORS.primaryColor,
                            backgroundColor: !isValid ? COLORS.secondaryColor : COLORS.primaryColor,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            fontWeight: 'bold',
                        }}
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
                <TextBottom
                    label='Back'
                    buttonContainerStyle={{
                        backgroundColor: undefined,
                        marginTop: 60,
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        color: COLORS.primaryColor,
                        fontWeight: 'bold',
                    }}
                    onPress={() => navigation.goBack()}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default SignOutScreen
