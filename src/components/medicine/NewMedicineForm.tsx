import React, { useContext } from 'react'
import { TextInput, View } from 'react-native'
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';
import { ThemeContext } from '../../context/theme/ThemeContext'
import { useForm } from '../../hooks/useForm';
import { Medicine, MedicineType } from '../../interfaces/medicine';
import { appStyles } from '../../theme/appTheme';
import { Button } from '../Button';
import { InputContainer } from '../InputContainer'
import { InputGroup } from '../InputGroup';
import { InputLabel } from '../InputLabel'
import { OptionTab } from '../OptionTab'
import { SelectOption } from '../SelectOption'
import { SwapListHiddenButton } from '../SwapListHiddenButton';
import { SwapListHiddenItems } from '../SwapListHiddenItems';
import { BasicMedicineListItem } from './BasicMedicineListItem';

const chOptions = [ "6", "30", "200", "100" ]

interface MedicineForm {
    name: string,
    type: MedicineType,
    ch: string,
    medicines: Medicine[],
}

export const NewMedicineForm = () => {
    
    const { onChange, form } = useForm<MedicineForm>({
        name: '',
        type: MedicineType.MEDICINE,
        ch: chOptions[0],
        medicines:[]
    })

    const { type } = form

    return (
        <View>
            {
                type === MedicineType.MEDICINE
                    ? ( <FirstSection 
                            onChange={ onChange }
                            form={ form }
                      /> )
                    : ( <FormWithList
                            form={ form }
                            onChange={ onChange }
                      />)
            }
        </View>
    )
}

interface FirstSectionProps {
    form: MedicineForm,
    onChange?: ( value: string, field: keyof MedicineForm ) => void;
}

const FirstSection = ({ form, onChange = () => {} }:FirstSectionProps) => {

    const { theme: { colors, elementsBackground, buttonTextColor }} = useContext( ThemeContext )
    const { type, ch, name } = form 

    return (
        <>
            <InputGroup>
                <InputLabel text='Nombre del medicamento'/>
                <InputContainer>
                    <TextInput 
                        value={ name }
                        onChangeText={ ( value ) => onChange( value, 'name' )}
                    />
                </InputContainer>
            </InputGroup>
            <InputGroup>
                <InputLabel text='Tipo'/>
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        flexDirection: 'row',
                        borderColor: colors.primary,
                        borderWidth: 2,
                        marginVertical: 10,
                        overflow: 'hidden',
                    }}
                >
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
                </View>
            </InputGroup>
            {
                type === MedicineType.MEDICINE
                ? (
                    <InputGroup>
                        <InputLabel text='Ch'/>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}>
                            {
                                chOptions.map( option => (
                                    <SelectOption 
                                        key={ option } 
                                        option={ option }
                                        backgroundColor={
                                            ch === option
                                                ? colors.primary
                                                : elementsBackground
                                        }
                                        textStyle={{
                                            ...appStyles.regularText,
                                            color: ( ch === option ) 
                                                ? buttonTextColor
                                                : colors.text,
                                        }}
                                        onPress={ ( selected ) => onChange( selected, 'ch' )}
                                    />
                                ))
                            }
                        </View>
                    </InputGroup>
                ):(
                    <InputGroup>
                        <InputLabel text='Medicamentos'/>
                        <Button 
                            text='Agregar'
                            style={{
                                paddingVertical: 12,
                                marginVertical: 10,
                            }}
                            onPress={ () => {} }
                        />
                    </InputGroup>
                )
            }
        </>
    )
}

interface Props extends FirstSectionProps {
    onDelete?: ( medicine: Medicine ) => void;
}

const FormWithList = ({ 
    form, 
    onDelete = () => {}, 
    onChange = () => {} 
}:Props) => {

    const { theme: { danger }} = useContext( ThemeContext )

    const handleDelete = ( medicine: Medicine, rowMap: RowMap<Medicine>) => {
        rowMap[ medicine._id ].closeRow()
        onDelete( medicine )
    }

    return (
        <View>
            <SwipeListView
                ListHeaderComponent={ <FirstSection 
                    onChange={ onChange }
                    form={ form }
                /> }
                useFlatList={ true }
                data={ form.medicines }
                renderItem={ ({ item }, rowMap) => (
                    <BasicMedicineListItem 
                        key={ item._id } 
                        medicine={ item }
                    />
                )}
                keyExtractor={ ( item ) => item._id }
                renderHiddenItem={ (data, rowMap) => (
                    <SwapListHiddenItems>
                        <View />
                        <View style={{
                            flexDirection: 'row-reverse'
                        }}>
                            <SwapListHiddenButton 
                                iconName='trash'
                                backgroundColor={ danger }
                                onPress={ () => handleDelete( data.item , rowMap )}
                            />
                        </View>
                    </SwapListHiddenItems>
                )}
                rightOpenValue={-125}
                disableRightSwipe
            />
        </View>
    )
}
