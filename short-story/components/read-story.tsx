import { useReactiveVar } from "@apollo/client"
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { defaultGray, defaultWhite } from "../common/colours"
import { rvCurrentStory } from "../common/common-states"
import { Dimensions } from 'react-native';
import { defaultFont } from "../common/fonts"

const windowWidth = Dimensions.get('window').width;
const windowCondition = windowWidth > 700

export const ReadStories = () => {

    const story = useReactiveVar(rvCurrentStory)

    if (!story) {
        return null
    }
    const time = story.publish_date.charAt(11) + story.publish_date.charAt(12) + story.publish_date.charAt(13) + story.publish_date.charAt(14) + story.publish_date.charAt(15)
    const day = story.publish_date.charAt(8) + story.publish_date.charAt(9)
    const month = story.publish_date.charAt(5) + story.publish_date.charAt(6)
    const year = story.publish_date.charAt(0) + story.publish_date.charAt(1) + story.publish_date.charAt(2) + story.publish_date.charAt(3)
    const publishDate = `${day}-${month}-${year}`


    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.page}>
                <View style={styles.dateContainer}>
                    <Text style={styles.time}>
                    Published on
                    </Text>
                    <Text style={styles.date}>
                        {publishDate},
                    </Text>
                    <Text style={styles.time}>
                        at {time}.
                    </Text>

                </View>
                <Text style={styles.title}>
                    {story.title}
                </Text>
                <Text style={styles.author}>
                    {story.author}
                </Text>
                <View style={styles.headingSpacer} />
                <Text style={styles.storyText}>
                    {story.story}
                </Text>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({

    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: windowCondition ? '15%' : 10,
        paddingVertical: '5%',
    },
    headingSpacer: {

        paddingVertical: windowCondition ? 40 : 20,
        borderTopWidth: 1,
        borderTopColor: 'black',
        width: '50%'
    },
    title: {
        fontSize: windowCondition ? 50 : 25,
        textAlign: 'center',
        fontFamily: defaultFont
    },
    author: {
        paddingVertical: 40,
        fontSize: windowCondition ? 25 : 15,
        textAlign: 'center',
        fontFamily: defaultFont
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultWhite,
        padding: windowCondition ? 50 : 20,
        borderRadius: 4,
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    },
    storyText: {
        lineHeight: 30,
        fontFamily: defaultFont,
    },
    time: {
        paddingRight: 5,
        fontSize: 12
    },
    date: {
        paddingRight: 5,
        fontSize: 12
    },
    dateContainer: {
        flexDirection: 'row',
        right: 0,
        width: '100%',
        justifyContent: 'flex-end',
        paddingVertical: 20,
    
    }

});
