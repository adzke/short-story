import { useReactiveVar } from "@apollo/client"
import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ShortStoryNavigatorPamarList } from "../App"
import { appleGreen, applePurple, appleSytemGray4, appleSytemGray4Dark, defaultBlack, defaultGray, defaultWhite } from "../common/colours"
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
            <View style={styles.storySpacer} />
            {stories.map(story => (
                <TouchableOpacity style={styles.cardContainer} onPress={() => readStory(story)} key={story.id}>
                    <View style={styles.card}>

                        <View style={styles.storyCard}>
                            <Text style={styles.storyText}>{story.story}</Text>
                        </View>
                        <View style={styles.storyInfoContainer}>
                            <Text style={styles.titleText}>
                                {story.title}
                            </Text>
                            <Text style={styles.authorText}>
                                {story.author}
                            </Text>
                        </View>


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
    storySpacer: {
        height: 100,
        width: '100%'
    },
    storyCard: {
        padding: 20,
        width: 150,
        height: 300,
        backgroundColor: defaultWhite,
        borderRadius: 3,
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    },
    storyText: {
        overflow: 'hidden',
        fontSize: 7,
        fontFamily: defaultFont
    },

    cardContainer: {
        flex: 1,
        margin: 10,
    },
    card: {
        flexDirection: 'row',
        width: 350,
        backgroundColor: defaultWhite,
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: 3,

    },
    titleText: {
        fontSize: 14,
        fontFamily: defaultFont,
        color: defaultBlack,
        overflow: 'hidden',
        textAlign: 'center',
    },
    authorText: {
        fontFamily: defaultFont,
        color: defaultBlack,
        fontSize: 10,
    },
    storyInfoContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,

    }


});
