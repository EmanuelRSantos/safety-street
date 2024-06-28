import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '78%',
        height: 55,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    empty: {
            borderColor: '#fff',
            borderWidth: 2,
    },
    filled: {
        backgroundColor: '#fff',
    },
    emptyLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    filledLabel: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})

export default styles;
