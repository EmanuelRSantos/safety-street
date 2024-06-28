import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#072960',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    linha: {
        height: 3,
        width: '80%',
        backgroundColor: "#FFFFFF",
        marginVertical: 30,
        label: {
            position: 'absolute',
            left: 'auto',
            color: '#fff',
            fontSize: 25,
            paddingHorizontal: 10,
            paddingBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#072960',
            fontWeight: 'bold'
        },
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default styles;