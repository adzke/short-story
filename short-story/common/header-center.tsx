import React from "react"
import { StyleSheet, View } from "react-native"
import { DefaultText } from "./default-text";


export const HeaderCenter = () => {

    

    return (
        <View>
               <DefaultText>Raven</DefaultText>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingRight: 20,
    },
});