import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        height: 30,
        width: 30
    },
    checkboxSelected: {
        backgroundColor: 'green'
    },
    checkboxText: {
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        fontSize: 16,
        marginLeft: 10
    }
})

export default styles;