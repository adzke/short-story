import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import React from "react"
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { defaultBlack, defaultWhite } from "./colours"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { DancingScript } from "./fonts";


export const HeaderCustom = ({ navigation: { navigate, goBack } }: NativeStackHeaderProps) => {

    const navigateToStories = () => {
        navigate('Stories')
    }

    const addStory = () => {
        navigate('AddStory')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.leftHeader}>
                    <TouchableOpacity style={styles.title} onPress={navigateToStories}>
                        <Image style={styles.logo} source={require('../assets/logo/drawing.svg')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rightHeader}>
                    <TouchableOpacity style={styles.icon} onPress={navigateToStories}>
                        <AntDesign name="home" size={30} color={defaultWhite} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.plusIcon} onPress={addStory}>
                        <Ionicons name="ios-add" size={44} color={defaultWhite} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        backgroundColor: defaultBlack,
    },
    leftHeader: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    rightHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 5,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 26,
        color: defaultWhite,
        fontFamily: DancingScript
    },
    logo: {
        height: 50,
        width: 150,
        resizeMode: 'stretch',
    },
    plusIcon: {
        marginLeft: 5,
    }

})