/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, TextInput, TextInputProps, ViewStyle, TextStyle } from 'react-native'
import useStyles from '../../hooks/useStyles'
import styled from './styled'
import { FieldError } from 'react-hook-form'
import { ErrorType } from '../../types/types'

type FormInputProps = {
    containerStyle?: ViewStyle,
    label?: string,
    placeholder: string,
    inputStyle?: TextStyle,
    prependComponent?: React.ReactNode,
    appendComponent?: React.ReactNode,
    onChange: (text: string) => void,
    onBlur: () => void,
    secureTextEntry?: boolean,
    keyboardType?: TextInputProps['keyboardType'],
    autoCompleteType?: TextInputProps['autoComplete'],
    autoCapitalize?: TextInputProps['autoCapitalize'],
    errorMsg?: ErrorType | FieldError,
    value: string,
}

const FormInput = ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    onBlur,
    secureTextEntry,
    keyboardType = 'default',
    autoCompleteType = 'off',
    autoCapitalize = 'none',
    errorMsg = '',
    value,
}: FormInputProps) => {
    const styles = useStyles(styled)

    return (
        <View style={{ ...containerStyle }}>
            <View style={styles.containerText}>
                <Text style={styles.legendLabel}>{label}</Text>
            </View>
            <View style={styles.containerPrepend}>
                {prependComponent}

                <TextInput
                    style={{ flex: 1, ...inputStyle, color: '#000' }}
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor='#898B9A'
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoComplete={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                />
                {appendComponent}
            </View>
            {errorMsg && (
                <View style={styles.containerError}>
                    <Text style={styles.legendLabelError}>{errorMsg as string}</Text>
                </View>
            )}
        </View>
    )
}

export default FormInput
