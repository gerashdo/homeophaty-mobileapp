import React from 'react'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { TextInput  } from 'react-native'
import { InputContainer } from '../InputContainer'
import { InputLabel } from '../InputLabel'

export const NewMedicinePrescriptionForm = () => {
    return (
        <BottomSheetScrollView>
            <InputLabel text='Prescripción'/>
            <InputContainer>
                <TextInput 
                    multiline
                    numberOfLines={ 18 }
                    style={{
                        textAlignVertical: 'top',
                    }}
                />
            </InputContainer>
        </BottomSheetScrollView>
    )
}
