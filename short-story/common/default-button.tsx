import React, { useState } from "react"
import { TouchableOpacity, StyleSheet, StyleProp, ColorValue, ViewStyle } from "react-native"
import { applePurple, appleSytemGray4, defaultWhite } from "./colours"
import { DefaultText } from "./default-text"

interface DefaultButtonProps {
    onPress(): void
    buttonText?: string
}
const defaultButtonText = "Press me"


export const DefaultButton = ({ onPress, buttonText = defaultButtonText }: DefaultButtonProps) => {

    const [buttonPressed, setButtonPressed] = useState<boolean>(false)
    const [borderColor, setBorderColour] = useState<ColorValue>(applePurple)

    const onPressButton = () => {
        setButtonPressed(true)
        onPress()
    }

    const onPressOutButton = () => {
        setButtonPressed(false)
    }


    return (
        <TouchableOpacity onPress={onPressButton} style={StyleSheet.compose(styles.buttonDesign, buttonPressed ? { borderColor: borderColor } : {})} onBlur={onPressOutButton} >
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
    } as ViewStyle,
})
