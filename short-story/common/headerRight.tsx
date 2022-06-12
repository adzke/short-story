import React from "react"
import { StyleSheet, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ShortStoryNavigatorPamarList } from "../App";
export const HeaderRight = () => {

    const navigation = useNavigation<NavigationProp<ShortStoryNavigatorPamarList>>();
    

    const addStory = () => {
        navigation.navigate('AddStory')
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={addStory}>
                <Ionicons name="ios-add" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingRight: 20,
    },
});