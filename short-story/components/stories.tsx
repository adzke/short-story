import { useReactiveVar } from "@apollo/client"
import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ShortStoryNavigatorPamarList } from "../App"
import { defaultGray, defaultWhite } from "../common/colours"
import { rvCurrentStory, rvStories } from "../common/common-states"
import { Story } from "../common/common-types"
import { defaultFont } from "../common/fonts"


export const Stories = ({ navigation: { navigate } }: StackScreenProps<ShortStoryNavigatorPamarList, 'Stories'>) => {

    const stories = useReactiveVar(rvStories)


    const readStory = (story: Story) => {
        rvCurrentStory(story)
        navigate('ReadStories')
    }


    return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {stories.map(story => (
                    <TouchableOpacity style={styles.cardContainer} onPress={() => readStory(story)} key={story.id}>
                        <View style={styles.cardTitleSection}>
                            <Text style={styles.titleText} key={story.id}>{story.title ? story.title : 'Untitled'}</Text>
                        </View>
                        <View style={styles.storyCard}>
                            <Text style={styles.storyText}>{story.story}</Text>
                        </View>
                        <View style={styles.cardInfoSection}>
                            <Text style={styles.titleText}>{story.author}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    },
    cardInfoSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
    },
    cardTitleSection: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    storyText: {
        overflow: 'hidden',
        fontSize: 7,
        fontFamily: defaultFont
    },
    titleText: {
        fontFamily: defaultFont,
        overflow: 'hidden',
        height: 38,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    cardContainer: {
        width: 200,
        height: 400,
        margin: 20,
    }
});
