import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Medicine } from '../../interfaces/medicine'

interface Props {
    medicine: Medicine;
    onPress?: ( item?: Medicine ) => void;
}

export const BasicMedicineListItem = ({ medicine, onPress = () => {} }:Props) => {

    const { theme: { colors, elementsBackground }} = useContext( ThemeContext )

    return (
        <TouchableOpacity
            activeOpacity={ 1 }
            onPress={ () => onPress( medicine ) }
        >
            <View style={{
                ...styles.container,
                backgroundColor: elementsBackground,
            }}>
                <View style={ styles.textContainer }>
                    <Text
                        style={{
                            ...styles.nameText,
                            color: colors.text,
                        }}
                    >{ medicine.name }</Text>
                    {
                        medicine.ch && (
                            <Text
                                style={{
                                    ...styles.chText,
                                    color: colors.text,
                                }}
                            >{ medicine.ch } ch</Text>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        marginEnd: 5,
        marginVertical: 5,
    },
    colorStripe: {
        width: 30,
    },
    elementsContainer:{
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 20,
    },
    textContainer: {
        justifyContent: 'center',
        minHeight: 60,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    chText: {
        fontSize: 20,
        fontWeight: '500',
    },
    icon: {
        opacity: 0.5
    }
})