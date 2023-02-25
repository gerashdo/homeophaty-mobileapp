
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native';
import { Text } from 'react-native'
import { TouchableOpacity, View } from 'react-native'
import { Medicine } from '../../interfaces/medicine'
import { appStyles } from '../../theme/appTheme';
import { ThemeContext } from '../theme/ThemeContext';

interface Props {
    medicine: Medicine;
    onPress?: ( medicine: Medicine ) => void;
}

export const MedicineSimpleCard = ({ medicine, onPress = () => {} }:Props) => {

    const { theme:{ colors }} = useContext( ThemeContext )

    const handleOnPress = () => {
        onPress( medicine )
    }

    return (
        <View>
            <TouchableOpacity
                onPress={ handleOnPress }
                style={[ styles.container, {
                    backgroundColor: colors.background,
                    borderColor: colors.border
                }]}
                activeOpacity={ 0.8 }
            >
                <Text 
                    style={[ appStyles.regularText, {
                        color: colors.text,
                    }]}
                >{ medicine.name }{ medicine.ch ? ` ${medicine.ch}` : '' }</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
    },
})
