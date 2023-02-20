import { StyleSheet } from "react-native";
import { ThemeState } from "../context/theme/themeReducer";


export const appStyles = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 15,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    regularText: {
        fontSize: 16,
        fontWeight: '500',
    },
})


export const lightTheme: ThemeState = {
    dark: false,
    currentTheme: 'light',
    colors: {
        primary: '#5C946E',
        background: 'white',
        card: 'white',
        text: '#04080F',
        border: '#D9D9D9',
        notification: 'teal',
    },
    secondary: 'purple',
    buttonTextColor: 'white',
}

export const darkTheme: ThemeState = {
    dark: true,
    currentTheme: 'light',
    colors: {
        primary: '#77E0A7',
        background: 'black',
        card: 'green',
        text: 'white',
        border: 'purple',
        notification: 'red',
    },
    secondary: 'purple',
    buttonTextColor: 'black',
}