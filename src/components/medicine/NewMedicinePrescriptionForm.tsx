import React, { useContext, useState } from 'react'
import { Platform, ScrollView, TextInput  } from 'react-native'

import { InputContainer } from '../InputContainer'
import { InputLabel } from '../InputLabel'
import { BottomPrincipalButton } from '../BottomPrincipalButton';
import { MedicineContext } from '../../context/medicine/MedicineContext';
import { Medicine } from '../../interfaces/medicine';

interface Props {
    medicine: Medicine;
    onSubmit: () => void;
}

export const NewMedicinePrescriptionForm = ({ onSubmit, medicine }:Props) => {
    const { createPrescription } = useContext( MedicineContext )
    const [ inputText, setInputText ] = useState('')

    const handleSubmit = async() => {
        await createPrescription( medicine._id, {
            description: inputText
        })
        onSubmit()
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
