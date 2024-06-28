import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#072960'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        width: '100%',
        height: 125,
        backgroundColor: '#072960',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopEndRadius: 15,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondOverlay: {
        width: '100%',
        minHeight: 250,
        backgroundColor: '#072960',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopEndRadius: 15,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    addBtn: {
        marginTop: '10%',
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        color: 'white'
    },
    goBackContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    }
});

export default styles;