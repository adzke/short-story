import { useReactiveVar } from "@apollo/client"
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { defaultWhite } from "../common/colours"
import { rvStories } from "../common/common-states"


export const Stories = () => {

    const stories = useReactiveVar(rvStories)

    return (
        <View style={styles.mainContainer}>
            {stories.map(i => (
                <TouchableOpacity>
                    <View style={styles.cardTitleSection}>
                        <Text key={i.id}>Just Ask for Mercy</Text>
                    </View>
                    <View style={styles.storyCard}>
                        <Text style={styles.storyText}>{i.story}</Text>
                    </View>
                    <View style={styles.cardInfoSection}>
                        <Text>{i.author}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({

    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    storyCard: {
        padding: 30,
        width: 200,
        height: 300,
        backgroundColor: defaultWhite,
        borderRadius: 3,
        margin: 20,
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    },
    cardInfoSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitleSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    storyText: {
        overflow: 'hidden',
        fontSize: 7,
    }
});
