import React from 'react'
import { makeVar, useReactiveVar } from '@apollo/client'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { defaultGray } from '../colours'

export const rvIsLoading = makeVar(false)

export const Loading = () => {
    const isLoading = useReactiveVar(rvIsLoading)

    if (isLoading) {
        return (
            <View style={styles.overlay}>
                <View style={styles.background} />
                <ActivityIndicator size='large' />
            </View>
        )
    }

    return null
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        zIndex: 99,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: defaultGray,
        opacity: 0.8
    },
})