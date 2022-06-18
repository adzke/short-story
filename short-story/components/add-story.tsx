import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react"
import { SafeAreaView, TextInput, StyleSheet, ViewStyle, ColorValue, Dimensions, View } from "react-native"
import { ShortStoryNavigatorPamarList } from "../App";
import { applePurple, appleSytemGray4, defaultWhite } from "../common/colours";
import { rvShowBanner } from "../common/common-states";
import { StoryPost } from "../common/common-types";
import { DefaultButton } from "../common/default-button";
import { postStories } from "../common/storiesAPIFunctions";

const inputHeight = 40
const inputMargin = 12
const inputPadding = 10
const inputBorderRadius = 4
const inputBorderWidth = 2
const inputBorderColour = appleSytemGray4 as ColorValue
const inputMultiLine = 200
const inputOutlineStyle = 'none'
const inputSelectedColour = applePurple as ColorValue
const windowWidth = Dimensions.get('window').width;
const windowCondition = windowWidth > 700

enum StorySection {
    Title = "Title",
    Author = "Author",
    Story = "Story"
}



type onFocus = boolean

export const AddStory = ({ navigation: { navigate } }: StackScreenProps<ShortStoryNavigatorPamarList, 'AddStory'>) => {
    const defaultFieldValue = ""
    const defaultTitleValue = "Untitled"
    const defaultAuthorValue = "Anonymous"
    const defaultStoryValue = "True! — nervous — very, very dreadfully nervous I had been and am; but why will you say that I am mad?"

    const [title, setTitle] = useState<string>(defaultFieldValue);
    const [author, setAuthor] = useState<string>(defaultFieldValue);
    const [story, setStory] = useState<string>(defaultFieldValue);
    const [borderColourTitle, setBorderColourTitle] = useState<ColorValue>(inputBorderColour);
    const [borderColourAuthor, setBorderColourAuthor] = useState<ColorValue>(inputBorderColour);
    const [borderColourStory, setBorderColourStory] = useState<ColorValue>(inputBorderColour);
    const textInputFocused: onFocus = true
    const textInputBlur: onFocus = false


    const selectionBorderChange = (storySelection: StorySection, textInputEvent: onFocus) => {

        const colourSetCondition = textInputEvent ? inputBorderColour : inputSelectedColour

        switch (storySelection) {
            case StorySection.Title:
                setBorderColourTitle(colourSetCondition)
                break;
            case StorySection.Author:
                setBorderColourAuthor(colourSetCondition)
                break;
            case StorySection.Story:
                setBorderColourStory(colourSetCondition)
                break;
        }

    }


    const clearFields = () => {

        setStory(defaultFieldValue)
        setAuthor(defaultFieldValue)
        setStory(defaultFieldValue)
    }
    const addStory = async () => {

        const storyTitle = title ? title : defaultTitleValue
        const storyAuthor = author ? author : defaultAuthorValue

        const storyPost: StoryPost = {
            title: storyTitle,
            author: storyAuthor,
            story: story,

        }
        try {
            const postResult = await postStories(storyPost)
            if (postResult.postSucessful) {
                clearFields()
                navigate('Stories')
            }
        }
        catch (error) {
  
        }
    }


    return (
        <SafeAreaView >
            <View style={styles.mainContainer}>
                <TextInput style={StyleSheet.compose(styles.title, { borderColor: borderColourTitle })} onChangeText={setTitle} placeholder={defaultTitleValue} onFocus={() => selectionBorderChange(StorySection.Title, textInputBlur)} onBlur={() => selectionBorderChange(StorySection.Title, textInputFocused)} />
                <TextInput style={StyleSheet.compose(styles.author, { borderColor: borderColourAuthor })} onChangeText={setAuthor} placeholder={defaultAuthorValue} onFocus={() => selectionBorderChange(StorySection.Author, textInputBlur)} onBlur={() => selectionBorderChange(StorySection.Author, textInputFocused)} />
                <TextInput style={StyleSheet.compose(styles.story, { borderColor: borderColourStory })} onChangeText={setStory} placeholder={defaultStoryValue} multiline={true} onFocus={() => selectionBorderChange(StorySection.Story, textInputBlur)} onBlur={() => selectionBorderChange(StorySection.Story, textInputFocused)} />
                <View style={styles.buttonContainer}>
                    <DefaultButton buttonText="Publish" onPress={addStory}></DefaultButton>
                </View>
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: windowCondition ? '15%' : 10,
        paddingVertical: '5%',
        display: 'flex',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        backgroundColor: defaultWhite,
        height: inputHeight,
        margin: inputMargin,
        padding: inputPadding,
        borderRadius: inputBorderRadius,
        borderWidth: inputBorderWidth,
        borderColor: inputBorderColour,
        outlineStyle: inputOutlineStyle
    } as ViewStyle,
    author: {
        backgroundColor: defaultWhite,
        height: inputHeight,
        margin: inputMargin,
        padding: inputPadding,
        borderRadius: inputBorderRadius,
        borderWidth: inputBorderWidth,
        borderColor: inputBorderColour,
        outlineStyle: inputOutlineStyle
    } as ViewStyle,
    story: {
        backgroundColor: defaultWhite,
        height: inputMultiLine,
        margin: inputMargin,
        padding: inputPadding,
        borderRadius: inputBorderRadius,
        borderWidth: inputBorderWidth,
        borderColor: inputBorderColour,
        outlineStyle: inputOutlineStyle
    } as ViewStyle,
});