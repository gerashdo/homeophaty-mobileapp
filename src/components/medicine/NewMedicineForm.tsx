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

const chOptions = [ "6", "30", "200", "100" ]

interface Props {
    onNavigateAddInnerMedicines?: ( form: MedicinePostRequest ) => void;
    onSubmit?: ( medicineData: MedicinePostRequest ) => void;
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
    const { createMedicine } = useContext( MedicineContext )
    
    const { onChange, form } = useForm<MedicinePostRequest>({
        name: '',
        type: MedicineType.MEDICINE,
        ch: chOptions[0],
        medicines:[]
    })

    const { name, ch, type } = form

    const handleOnAddInnerMedicines = () => {
        onNavigateAddInnerMedicines( form )
    }

    const handleFormSubmit = () => {
        createMedicine( form )
        onSubmit( form )
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
        <View
            style={{
                position: 'absolute',
                width: '100%',
                bottom: 30,
            }}
        >
            <Button 
                text='Guardar'
                style={{
                    backgroundColor: secondary,
                }}
                onPress={ handleFormSubmit }
            />
        </View>
        </>
    )
}

