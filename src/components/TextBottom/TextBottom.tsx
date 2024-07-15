import React, { ReactNode } from 'react'
import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { COLORS } from '../../utils/theme'

type TextBottomProps = {
    buttonContainerStyle?: ViewStyle,
    disabled?: boolean,
    label?: string,
    label2?: string,
    label2Style?: TextStyle,
    labelStyle?: TextStyle,
    onPress: () => void,
    children?: ReactNode,
}

const TextBottom = ({
    buttonContainerStyle,
    disabled,
    label,
    label2 = '',
    label2Style,
    labelStyle,
    onPress,
    children,
}: TextBottomProps) => {
    return (
        <TouchableOpacity style={[styles.container, { ...buttonContainerStyle }]} disabled={disabled} onPress={onPress}>
            {label !== '' && <Text style={[styles.title, { ...labelStyle }]}>{label}</Text>}
            {label2 !== '' && <Text style={[styles.title2, { ...label2Style }]}>{label2}</Text>}
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryColor,
    },
    title: {
        color: 'white',
        fontSize: 14,
    },
    title2: {
        flex: 1,
        textAlign: 'right',
        color: 'white',
        fontSize: 14,
    },
})

export default TextBottom
