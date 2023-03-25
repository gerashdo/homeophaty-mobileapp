import { StyleSheet } from "react-native";
import { ThemeState } from "../context/theme/themeReducer";


export const appStyles = StyleSheet.create({
    globalMargin: {
        marginHorizontal: 15,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 24,
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
    softTextColor: '#898989',
    overlay: 'rgba(0,0,0,0.1)',
}

export const darkTheme: ThemeState = {
    dark: true,
    currentTheme: 'dark',
    colors: {
        primary: '#6DA15F',
        background: '#1E1E1E',
        card: '#2F2F2F',
        text: '#EDEDED',
        border: '#555555',
        notification: '#4CC9F0',
    },
    elementsBackground: '#3A3A3A',
    secondary: '#1E90FF',
    buttonTextColor: '#EDEDED',
    danger: '#FFB347',
    softTextColor: '#AFAFAF',
    overlay: 'rgba(255, 255, 255, 0.1)',
}