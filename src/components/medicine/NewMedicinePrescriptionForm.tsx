import React, { useState, useContext } from 'react'
import { Platform, ScrollView, TextInput  } from 'react-native'

import { InputContainer } from '../InputContainer'
import { InputLabel } from '../InputLabel'
import { BottomPrincipalButton } from '../BottomPrincipalButton';
import { NewPrescriptionRequest } from '../../interfaces/medicine';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    onSubmit: ( prescriptionData: NewPrescriptionRequest ) => void;
    initialtext?: string;
}

export const NewMedicinePrescriptionForm = ({ onSubmit, initialtext }:Props) => {
    
    const { theme: { colors }} = useContext( ThemeContext )
    const [ inputText, setInputText ] = useState( initialtext || '' )

    const handleSubmit = () => {
        onSubmit({ description: inputText })
    }

    return (
        <>
            <ScrollView>
                <InputLabel text='Prescripción'/>
                <InputContainer
                    style={{
                        marginBottom: ( Platform.OS === 'ios' ) ? 60 : 50,
                    }}
                >
                    <TextInput 
                        multiline
                        numberOfLines={ 15 }
                        style={{
                            textAlignVertical: 'top',
                            color: colors.text
                        }}
                        value={ inputText }
                        onChangeText={ setInputText }
                        autoFocus
                        autoCapitalize='sentences'
                        autoCorrect
                        />
                </InputContainer>
            </ScrollView>
                <BottomPrincipalButton 
                    text='Guardar'
                    style={{
                        position: 'relative'
                    }}
                    onPress={ handleSubmit }
                />
        </>
    )
}
