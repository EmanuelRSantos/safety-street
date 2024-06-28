import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import styles from "./styles";

const GoBackButton = ({ onPress }) => {

    return (
        <TouchableOpacity style={[styles.container]} onPress={onPress}>
            <View>
                <Ionicons style={[styles.button]} name="arrow-back-circle-outline" size={50} color="black" />            
            </View>
        </TouchableOpacity>
    )
}

export default GoBackButton;