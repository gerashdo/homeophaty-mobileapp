import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Text, TextInput, View } from 'react-native'
import { AuthContext } from '../../context/auth/AuthContext'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { useForm } from '../../hooks/useForm'
import { appStyles } from '../../theme/appTheme'
import { Button } from '../Button'
import { InputContainer } from '../InputContainer'
import { InputLabel } from '../InputLabel'

export const LoginForm = () => {
  
    const { theme: { colors } } = useContext( ThemeContext )
    const { login, state } = useContext( AuthContext )
    const { form, onChange} = useForm({
        username: '',
        password: '',
    })
    const { username, password } = form
    const navigator = useNavigation()

    const handleSubmit = () => {
        login( username, password )
    }
    console.log( state )
    
    return (
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
                        value={ username }
                        onChangeText={ ( text ) => onChange( text, 'username' )}
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
                    value={ password }
                    onChangeText={ ( text ) => onChange( text, 'password' )}
                />
                </InputContainer>
            </View>
            <View style={{
                marginTop: 10,
            }}>
                <Button 
                    text='Iniciar sesión'
                    onPress={ handleSubmit }
                />
            </View>
        </View>
    )
  
}
