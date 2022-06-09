import { useReactiveVar } from "@apollo/client"
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { defaultGray, defaultWhite } from "../common/colours"
import { rvCurrentStory, rvStories } from "../common/common-states"
import { Story } from "../common/common-types"



export const ReadStories = () => {

    const story = useReactiveVar(rvCurrentStory)

    if (!story) {
        return null
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>

                <Text style={styles.title}>
                    {story.title}
                </Text>
                <Text style={styles.author}>
                    {story.author}
                </Text>
                <View style={styles.headingSpacer} />
                <Text>
                    {story.story}
                </Text>

        </ScrollView>
    )
}
const styles = StyleSheet.create({

    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '20%',
        paddingVertical: '5%'
    },
    headingSpacer: {
        paddingVertical: 50,
    },
    title: {
        fontSize: 50,
    },
    author: {
        paddingVertical: 20,
        fontSize: 35,
    }

});
