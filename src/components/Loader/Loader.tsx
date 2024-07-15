import React, { useEffect, useRef } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { useLoading } from '../../context/LoaderContext'

const Loader = () => {
    const { isLoading } = useLoading()
    const dot1 = useRef(new Animated.Value(0)).current
    const dot2 = useRef(new Animated.Value(0)).current
    const dot3 = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const animate = (dot: Animated.Value, delay: number) => {
            Animated.sequence([
                Animated.timing(dot, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(dot, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTimeout(() => animate(dot, delay), delay)
            })
        }

        animate(dot1, 300)
        animate(dot2, 600)
        animate(dot3, 900)
    }, [dot1, dot2, dot3])

    const getDotStyle = (dot: Animated.Value) => ({
        opacity: dot,
        transform: [
            {
                scale: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.5],
                }),
            },
        ],
    })

    if (!isLoading) return

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Animated.View style={[styles.dot, getDotStyle(dot1)]} />
                <Animated.View style={[styles.dot, getDotStyle(dot2)]} />
                <Animated.View style={[styles.dot, getDotStyle(dot3)]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 100,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
})

export default Loader
