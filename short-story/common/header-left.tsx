import React from "react"
import { StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ShortStoryNavigatorPamarList } from "../App";
import { AntDesign } from '@expo/vector-icons';
import { rvCurrentStory, rvStories } from "./common-states";
import { useReactiveVar } from "@apollo/client";
import { defaultBlack } from "./colours";


export const HeaderLeft = () => {

    const navigation = useNavigation<NavigationProp<ShortStoryNavigatorPamarList>>();
    const stories = useReactiveVar(rvStories)

    const navigateToStories = () => {
        navigation.navigate('Stories')
    }

    const navigateToRandomSotry = () => {
        var story = stories[Math.floor(Math.random() * stories.length)];
        rvCurrentStory(story)
        navigation.navigate('ReadStories')
    }

    return (
        <View style={styles.headingContainer}>
            <TouchableOpacity style={styles.container} onPress={navigateToStories}>
                <AntDesign name="home" size={30} color={defaultBlack} />
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    headingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    container: {
        paddingLeft: 20,
    },
});