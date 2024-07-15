import { StyleSheet } from 'react-native'

/**
 * Verify if a style is a valid
 * @param style - style sentence to evaluate
 */
export const checkValidStyle = (style: object): boolean => {
    if (typeof style !== 'object' || style === null) {
        return false
    }

    const allNotObjectValues = Object.values(style).find((current) => typeof current !== 'object')

    if (allNotObjectValues !== undefined) {
        return false
    }

    return true
}

/**
 * Take a js object and convert to StyleSheet React-Native
 * @param styles - Array of style objects
 * @return StyleSheet
 */
export default function useStyles(...styles: object[]): StyleSheet.NamedStyles<any> {
    // Verify if arguments length is > 0
    if (styles.length === 0) {
        throw new Error('useStyles: without styles to process')
    }

    // Storage styles arguments to concat
    let combinedStyles: { [key: string]: object } = {}

    for (let style of styles) {
        // Verify valid style
        if (!checkValidStyle(style)) {
            throw new Error('useStyles: style is not a valid sentence')
        }

        combinedStyles = { ...combinedStyles, ...style }
    }

    return StyleSheet.create(combinedStyles)
}
