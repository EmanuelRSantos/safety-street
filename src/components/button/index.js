import React from "react";
import { TouchableOpacity, View } from "react-native";
import Label from '../label'
import styles from "./styles";

const Button = ({ type, text, onPress, extraStyle}) => {

    let structure = '';
    let label = '';

    switch (type) {
        case 'empty':
            structure = styles.empty;
            label = styles.emptyLabel;
            break;
        case 'filled':
            structure = styles.filled;
            label = styles.filledLabel;
            break;
    }

    const structureSelected = structure;
    const labelSelected = label;

    return (
        <TouchableOpacity style={[styles.container, structureSelected, extraStyle]} onPress={onPress}>
            <View>
                <Label text={text} extraStyle={labelSelected} />
            </View>
        </TouchableOpacity>
    )
}

export default Button;