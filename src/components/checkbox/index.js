import React, { useRef } from "react";
import { TouchableOpacity, Text, View, Animated } from "react-native";
import styles from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';

const Checkbox = ({ text, onPress, isChecked, containerStyle, textStyle, checkboxStyle }) => {
    const animatedWidth = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        const toValue = isChecked ? 0 : 30;
        Animated.timing(animatedWidth, {
            toValue: toValue,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity
                onPress={() => {
                    startAnimation();
                    onPress();
                }}
                style={[
                    styles.checkbox,
                    isChecked && styles.checkboxSelected,
                    checkboxStyle,
                ]}>
                <Animated.View style={{ width: { animatedWidth } }}>
                    <Icon name="checkmark" size={30} style={{ color: isChecked ? 'white' : '#0077B6' }} />
                </Animated.View>
            </TouchableOpacity>
            <Text style={[styles.checkboxText, textStyle]}>{text}</Text>
        </View>
    )
};

export default Checkbox;