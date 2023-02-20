import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, TextInput, View } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext';
import { appStyles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { InputContainer } from '../components/InputContainer';
import { InputLabel } from '../components/InputLabel';


export const LoginScreen = () => {
    const { top } = useSafeAreaInsets()
    const { theme: { colors } } = useContext( ThemeContext )
    const navigator = useNavigation()
    return (
        <View style={{
            ...appStyles.globalMargin,
            flex: 1,
            marginTop: top,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View
                style={{
                    width: '80%',
                }}
            >
                <Text style={{ 
                    ...appStyles.subTitle, 
                    color: colors.text,
                    marginBottom: 10,
                }}>Iniciar sesión</Text>
                <View style={{
                    marginTop: 10,
                }}>
                    <InputLabel text='Usuario'/>
                    <InputContainer>
                        <TextInput
                            style={{
                                ...appStyles.regularText,
                                color: colors.text,
                            }}
                            autoCapitalize='none'
                            autoCorrect={ false }
                            autoFocus
                            placeholder='Ingresa tu usuario'
                        />
                    </InputContainer>
                </View>
                <View style={{
                    marginTop: 10,
                }}>
                <InputLabel text='Contraseña'/>
                    <InputContainer>
                    <TextInput
                        style={{
                            ...appStyles.regularText,
                            color: colors.text,
                        }}
                        autoCapitalize='none'
                        autoCorrect={ false }
                        secureTextEntry
                        placeholder='Ingresa tu contraseña'
                    />
                    </InputContainer>
                </View>
                <View style={{
                    marginTop: 10,
                }}>
                    <Button text='Iniciar sesión'/>
                </View>
            </View>
        </View>
    )
}
