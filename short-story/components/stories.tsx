import { useReactiveVar } from "@apollo/client"
import React from "react"
import { View, Text } from "react-native"
import { rvStories } from "../common/common-states"


export const Stories = () => {

    const stories = useReactiveVar(rvStories)

    return (
        <View>
            {stories.map(i => (
                <Text key={i.id}>{i.author}.</Text>
            ))}
        </View>
    )
}