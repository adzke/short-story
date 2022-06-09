import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StackScreenProps } from '@react-navigation/stack'

export type RefidexNavigatorPamarList = {
    ['Home']: undefined
    ['Display Contacts']: undefined
}
export const HomeScreen = ({ navigation: {navigate}  }: StackScreenProps<RefidexNavigatorPamarList, 'Home'>) => {

    const navigateToContacts = () => {
        navigate(`Display Contacts`)
    }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <TouchableOpacity onPress={navigateToContacts}>
                    <Text>Contacts</Text>
                </TouchableOpacity>
            </View>
        );
    }