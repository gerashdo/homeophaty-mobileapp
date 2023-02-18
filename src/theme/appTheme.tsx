import { StyleSheet } from "react-native";
import { ThemeState } from "../context/theme/themeReducer";

export const appStyles = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 15,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    }
})


export const lightTheme: ThemeState = {
    dark: false,
    currentTheme: 'light',
    colors: {
        primary: 'green',
        background: 'white',
        card: 'white',
        text: 'black',
        border: 'black',
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