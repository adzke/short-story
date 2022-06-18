import { useReactiveVar } from "@apollo/client"
import { StackScreenProps } from "@react-navigation/stack"
import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { ShortStoryNavigatorPamarList } from "../App"
import { defaultBlack, defaultWhite } from "../common/colours"
import { rvCurrentStory, rvShowSearchBar, rvStories } from "../common/common-states"
import { Story } from "../common/common-types"
import { defaultFont } from "../common/fonts"
import { inputBorderColour, inputBorderRadius, inputBorderWidth, inputHeight, inputMargin, inputOutlineStyle, inputPadding } from "./add-story"


export const Stories = ({ navigation: { navigate } }: StackScreenProps<ShortStoryNavigatorPamarList, 'Stories'>) => {

    const [searchValue, SetSearchValue] = useState<String>('')

    const stories = useReactiveVar(rvStories)
    const showSearchBar = useReactiveVar(rvShowSearchBar)

    const readStory = (story: Story) => {
        rvCurrentStory(story)
        navigate('ReadStories')
    }

    const setSearch = (value: string) => {
        SetSearchValue(value)
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            {showSearchBar && <TextInput onChangeText={SetSearchValue} placeholder="Search..." style={styles.searchBar}/>}
            <View style={styles.storySpacer} />

            {stories
                .filter(story => story.author.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || story.publish_date.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || story.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1  || story.story.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
                .sort((a, b) => b.id - a.id)
                .map(story => (
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
        height: 5,
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

    },
    searchBar: {
        width: 330,
        height: inputHeight,
        margin: inputMargin,
        padding: inputPadding,
        marginTop: 10,
        borderRadius: inputBorderRadius,
        borderWidth: inputBorderWidth,
        borderColor: inputBorderColour,
        outlineStyle: inputOutlineStyle,
        backgroundColor: defaultWhite
    }


});
