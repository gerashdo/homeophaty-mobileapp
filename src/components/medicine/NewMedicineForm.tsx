import React, { useContext } from 'react'
import { ScrollView, TextInput, View } from 'react-native'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { useForm } from '../../hooks/useForm';
import { MedicinePostRequest, MedicineType } from '../../interfaces/medicine';
import { appStyles } from '../../theme/appTheme';
import { Button } from '../Button';
import { InputContainer } from '../InputContainer'
import { InputGroup } from '../InputGroup';
import { InputLabel } from '../InputLabel'
import { OptionTab } from '../OptionTab'
import { OptionTabsContainer } from '../OptionTabsContainer';
import { SelectSquareOptions } from '../SelectSquareOptions';
import { MedicineContext } from '../../context/medicine/MedicineContext';
import { BottomPrincipalButton } from '../BottomPrincipalButton';

interface Props {
    onNavigateAddInnerMedicines?: () => void;
    onSubmit?: ( ) => void;
}

export const NewMedicineForm = ({ 
    onNavigateAddInnerMedicines = () => {},
    onSubmit = () => {},
}:Props) => {

    const { theme: { 
        colors,  
        buttonTextColor, 
        secondary 
    }} = useContext( ThemeContext )
    const { createMedicine, newMedicineState, chOptions } = useContext( MedicineContext )
 

    const { medicineData, onChange } = newMedicineState

    const { name, ch, type } = medicineData

    const handleOnAddInnerMedicines = () => {
        onNavigateAddInnerMedicines()
    }

    const handleFormSubmit = async() => {
        await createMedicine()
        onSubmit()
    }

    return (
        <>
        <ScrollView style={{ flex: 1 }}>
            <InputGroup>
                <InputLabel text='Nombre del medicamento'/>
                <InputContainer>
                    <TextInput
                        autoCapitalize='words'
                        autoCorrect={ false } 
                        value={ name }
                        onChangeText={ ( value ) => onChange( value, 'name' )}
                    />
                </InputContainer>
            </InputGroup>
            <InputGroup>
                <InputLabel text='Tipo'/>
                <OptionTabsContainer>
                    <OptionTab
                        text='Medicamento'
                        backgroundColor={
                            type === MedicineType.MEDICINE
                                ? colors.primary
                                : colors.background
                        }
                        textStyle={{
                            ...appStyles.regularText,
                            color: ( type === MedicineType.MEDICINE ) 
                                ? buttonTextColor
                                : colors.text,
                        }}
                        onPress={ () => onChange( MedicineType.MEDICINE, 'type' ) }
                    />
                    <OptionTab
                        text='Formula'
                        backgroundColor={
                            type === MedicineType.FORMULA
                                ? colors.primary
                                : colors.background
                        }
                        textStyle={{
                            ...appStyles.regularText,
                            color: ( type === MedicineType.FORMULA ) 
                                ? buttonTextColor
                                : colors.text,
                        }}
                        onPress={ () => onChange( MedicineType.FORMULA, 'type' ) }
                    />
                </OptionTabsContainer>
            </InputGroup>
            {
                type === MedicineType.MEDICINE
                ? (
                    <InputGroup>
                        <InputLabel text='Ch'/>
                        <SelectSquareOptions 
                            value={ ch }
                            options={ chOptions }
                            onValueSelected={ ( selected ) => onChange( selected as any, 'ch')}
                        />
                    </InputGroup>
                ):(
                    <InputGroup>
                        <InputLabel text='Medicamentos'/>
                        <Button 
                            text='Agregar medicamentos'
                            style={{
                                paddingVertical: 12,
                                marginVertical: 10,
                            }}
                            onPress={ handleOnAddInnerMedicines }
                        />
                    </InputGroup>
                )
            }
        </ScrollView>

        <BottomPrincipalButton 
            text='Guardar'
            onPress={ handleFormSubmit }
        />
        </>
    )
}

