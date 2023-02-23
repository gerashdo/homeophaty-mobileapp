import React, { useContext } from 'react'
import { TextInput, View } from 'react-native'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { appStyles } from '../../theme/appTheme';
import { InputContainer } from '../InputContainer'
import { InputGroup } from '../InputGroup';
import { InputLabel } from '../InputLabel'
import { OptionTab } from '../OptionTab'
import { SelectOption } from '../SelectOption'

const chOptions = [ "6", "30", "200", "100" ]

export const NewMedicineForm = () => {
    const { theme: { colors }} = useContext( ThemeContext )

    return (
        <View>
            <InputGroup>
                <InputLabel text='Nombre del medicamento'/>
                <InputContainer>
                    <TextInput />
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
                    backgroundColor={ colors.primary }
                    textStyle={{
                    ...appStyles.regularText,
                    color: colors.text,
                    }}
                />
                <OptionTab
                    text='Formula'
                    backgroundColor='white'
                    textStyle={{
                    ...appStyles.regularText,
                    color: colors.text,
                    }}
                />
                </View>
            </InputGroup>
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
                                textStyle={{
                                    ...appStyles.regularText,
                                    color: colors.text,
                                }}
                            />
                        ))
                    }
                </View>
            </InputGroup>
        </View>
    )
}
