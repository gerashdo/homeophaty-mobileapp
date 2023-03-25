import { Theme } from "@react-navigation/native";
import { darkTheme, lightTheme } from "../../theme/appTheme";

type ThemeAction = 
    | { type: 'set_light_color' }
    | { type: 'set_dark_color' }

export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark';
    secondary: string;
    elementsBackground: string;
    buttonTextColor: string;
    danger: string;
    softTextColor: string;
    overlay: string;
}

export const themeReducer = ( state: ThemeState, action: ThemeAction ) => {

    switch ( action.type ) {
        case 'set_dark_color':
            return { ...darkTheme };
        case 'set_light_color':
            return { ...lightTheme }
        default:
            return state;
    }
}