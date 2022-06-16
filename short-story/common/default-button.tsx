import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { appleSytemGray4, defaultWhite } from "./colours"
import { DefaultText } from "./default-text"

interface DefaultButtonProps {
    onPress(): void
    buttonText?: string
}

const defaultButtonText = "Press me"


export const DefaultButton = ({ onPress, buttonText = defaultButtonText }: DefaultButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonDesign}>
            <DefaultText>{buttonText}</DefaultText>
        </TouchableOpacity>)
}
const styles = StyleSheet.create({
    buttonDesign: {
        height: 50,
        width: 200,
        backgroundColor: defaultWhite,
        borderWidth: 2,
        borderColor: appleSytemGray4,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
