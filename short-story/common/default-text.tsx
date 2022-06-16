import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { appleSytemGray4Dark } from "./colours"
import { defaultFontSize } from "./fonts"

interface DefaultButtonProps {
    children: React.ReactNode
}

export const DefaultText = ({ children }: DefaultButtonProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.defaultText}>
            {children}
            </Text>
        </View>)
}
const styles = StyleSheet.create({
    container: {

    },
    defaultText: {
        fontSize: defaultFontSize,
        color: appleSytemGray4Dark,
    }
})
