/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, StatusBar, ScrollView, RefreshControl, Image, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { fetchBookList } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { Book } from '../../types/api.types'
import { RootStackParamsList } from '../../types/global'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { QUERY_CACHE_KEYS, ROUTER } from '../../utils/constants'
import { COLORS, FONTS, SIZES } from '../../utils/theme'
import { TextBottom } from '../../components'

type Props = NativeStackScreenProps<RootStackParamsList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {
    const { token, signOut } = useAuth()

    const {
        data: books,
        refetch,
        isFetching,
    } = useQuery([QUERY_CACHE_KEYS.books], () => fetchBookList(String(token)), {
        onError: (error: any) => {
            if (error.response.status === 401) {
                signOut()
                navigation.navigate(ROUTER.SignIn)
            } else {
                console.error('Error fetching books', error)
            }
        },
        enabled: !!token,
        refetchOnWindowFocus: true,
    })

    const signOutSubmit = async () => {
        await signOut()
        navigation.navigate(ROUTER.SignIn)
    }

    if (!books) return

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor='#6c757d' />
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
                {books?.map((book: Book, index: React.Key) => (
                    <View key={index} style={style.cardContainer}>
                        <Image source={{ uri: book.cover }} style={{ height: 150, resizeMode: 'contain' }} />
                        <View style={style.containerText}>
                            <Text style={style.heading}>{book.title}</Text>
                            <Text style={style.paragraph}>{book.author}</Text>
                            <Text style={style.paragraph}>{book.isbn}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16, columnGap: 36 }}>
                <TextBottom
                    label='Refresh'
                    buttonContainerStyle={{
                        flex: 1,
                        height: 50,
                        alignItems: 'center',
                        borderRadius: SIZES.radius,
                        elevation: 20,
                        shadowColor: COLORS.primaryColor,
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        fontWeight: 'bold',
                    }}
                    onPress={refetch}
                />
                <TextBottom
                    label='Sign Out'
                    buttonContainerStyle={{
                        flex: 1,
                        height: 50,
                        alignItems: 'center',
                        borderRadius: SIZES.radius,
                        elevation: 20,
                        shadowColor: COLORS.primaryColor,
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        fontWeight: 'bold',
                    }}
                    onPress={signOutSubmit}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.BackgroundColorLight,
        borderRadius: 12,
        padding: 16,
        shadowColor: COLORS.primaryColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10, // Required for Android
        // width: 250,
        gap: 16,
        marginBottom: 16,
    },
    containerText: {
        alignItems: 'center',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: COLORS.primaryColor,
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 24,
        color: '#898B9A',
    },
})

export default HomeScreen
