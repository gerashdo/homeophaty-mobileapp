import { createContext, useEffect, useReducer } from "react"
import { useColorScheme } from "react-native";
import { lightTheme } from "../../theme/appTheme"
import { themeReducer, ThemeState } from "./themeReducer"

interface ThemeContextProps {
    theme: ThemeState;
    setLightTheme: () => void;
    setDarkTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps)

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const ThemeProvider = ({ children }: Props ) => {
    const colorScheme = useColorScheme()
    const [ theme, dispatch ] = useReducer( themeReducer, lightTheme )

    useEffect( () => {
        if( colorScheme === 'light' ) return setLightTheme()
        setDarkTheme()
    }, [ colorScheme ])

    const setLightTheme = () => {
        dispatch({ type: 'set_light_color' })
    }

    const setDarkTheme = () => {
        dispatch({ type: 'set_dark_color' })
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            setLightTheme,
            setDarkTheme,
        }}>
            { children }
        </ThemeContext.Provider>
    )
}