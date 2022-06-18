import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import React from "react"
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { defaultBlack, defaultWhite } from "./colours"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { DancingScript } from "./fonts";
import { useReactiveVar } from "@apollo/client";
import { rvShowSearchBar } from "./common-states";

export const HeaderCustom = ({ navigation: { navigate } }: NativeStackHeaderProps) => {

    const searchBar = useReactiveVar(rvShowSearchBar)

    const navigateToStories = () => {
        navigate('Stories')
    }

    const addStory = () => {
        navigate('AddStory')
    }

    const showSearchBar = () => {
        rvShowSearchBar(!searchBar)
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
                    <TouchableOpacity style={styles.searchIcon} onPress={showSearchBar}>
                        <AntDesign name="search1" size={29} color={defaultWhite} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={navigateToStories}>
                        <AntDesign name="home" size={30} color={defaultWhite} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.plusIcon} onPress={addStory}>
                        <Ionicons name="ios-add" size={42} color={defaultWhite} />
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
    },
    searchIcon: {
        marginRight: 6,
        marginTop: 2,
    }

})