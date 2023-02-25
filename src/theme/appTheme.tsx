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
        primary: '#7FB069',
        background: '#FEFEFE',
        card: 'white',
        text: '#04080F',
        border: '#D9D9D9',
        notification: 'teal',
    },
    elementsBackground: '#F3F5F9',
    secondary: '#2191FB',
    buttonTextColor: '#FEFEFE',
    danger: '#EE964B',
    softTextColor: '898989',
}

export const darkTheme: ThemeState = {
    dark: true,
    currentTheme: 'dark',
    colors: {
        primary: '#5C946E',
        background: '#FEFEFE',
        card: 'white',
        text: '#04080F',
        border: '#D9D9D9',
        notification: 'teal',
    },
    elementsBackground: '#F3F5F9',
    secondary: '#507DBC',
    buttonTextColor: '#FEFEFE',
    danger: '#EE964B',
    softTextColor: '898989',
}