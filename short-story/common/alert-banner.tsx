import React from "react"
import { View, StyleSheet, Text, ViewStyle } from "react-native"
import { defaultWhite } from "./colours"
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useReactiveVar } from "@apollo/client";
import { rvShowBanner } from "./common-states";

export enum BannerColours  {
    applePurple = '#5856d6',
    appleRed = '#ff3b30',
    appleGreen = '#4cd964'


}

export type BannerProps = {
    message: string,
    colour: BannerColours
}

export const AlertBanner = () => {

    const showBanner = useReactiveVar(rvShowBanner)
    const displayNone = {display: 'none'} as ViewStyle

    const closeBanner = () => {
        rvShowBanner(undefined)
    }

    if (showBanner === undefined) {
        return null
    }

    const {
        colour,
        message,
    } = showBanner
    return (
        <View style={showBanner ? styles.mainContainer : displayNone}>
            <View style={StyleSheet.compose(styles.background, {backgroundColor: colour})}>
                <View style={styles.contentRow}>
                    <Text style={styles.alertText}>{message}</Text>
                    <View style={styles.closeIcon}>
                        <TouchableOpacity onPress={closeBanner}>
                            <AntDesign name="close" size={24} color={defaultWhite} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        top: 55,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
        height: 50,
    } as ViewStyle,
    background: {
        flex: 1,
        width: 330,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        backgroundColor: '#f44336',
        borderRadius: 3,

    } as ViewStyle,
    alertText: {
        color: defaultWhite,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    contentRow: {
        width: 330,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        position: 'absolute',
        right: 10,
    }
})
