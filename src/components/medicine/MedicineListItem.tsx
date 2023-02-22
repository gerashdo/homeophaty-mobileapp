import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Medicine, MedicineType } from '../../interfaces/medicine'

interface Props {
    medicine: Medicine;
}

export const MedicineListItem = ({ medicine }:Props) => {

    const { theme: { colors, secondary }} = useContext( ThemeContext )

    return (
        <View>
            <View style={{
                ...styles.container,
                backgroundColor: 'white'
            }}>
                <View 
                    style={{
                        ...styles.colorStripe,
                        backgroundColor: ( medicine.type === MedicineType.FORMULA ) 
                            ? secondary
                            : colors.primary,
                    }}
                />
                <View
                    style={ styles.elementsContainer }
                >
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
                    <TouchableOpacity>
                        <Icon 
                            name='ellipsis-vertical'
                            color={ colors.text }
                            size={ 30 }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    colorStripe: {
        width: 50,
    },
    elementsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 20,
        flex: 1
    },
    textContainer: {
        minHeight: 80,
        justifyContent: 'center',
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    chText: {
        fontWeight: '500',
        fontSize: 24,
    },
})
