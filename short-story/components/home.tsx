import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StackScreenProps } from '@react-navigation/stack'
import { ShortStoryNavigatorPamarList } from '../App'
import { Stories } from "./stories";

export const HomeScreen = ({ navigation: {navigate}  }: StackScreenProps<ShortStoryNavigatorPamarList, 'Home'>) => {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
            </View>
        );
    }

    