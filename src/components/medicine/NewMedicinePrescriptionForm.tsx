import React, { useState } from 'react'
import { ScrollView, TextInput  } from 'react-native'

import { InputContainer } from '../InputContainer'
import { InputLabel } from '../InputLabel'

interface Props {
    value: string;
    onValueChange: ( value: string ) => void;
}

export const NewMedicinePrescriptionForm = ({ value, onValueChange }:Props) => {

    return (
        <ScrollView style={{ flex: 1 }}>
            <InputLabel text='Prescripción'/>
            <InputContainer>
                <TextInput 
                    multiline
                    numberOfLines={ 30 }
                    style={{
                        textAlignVertical: 'top',
                    }}
                    value={ value }
                    onChangeText={ onValueChange }
                    autoFocus
                    autoCapitalize='sentences'
                    autoCorrect
                />
            </InputContainer>
        </ScrollView>
    )
}
