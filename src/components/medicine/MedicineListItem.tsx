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
                shadowColor: colors.text,
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
        flexDirection: 'row',
        overflow: 'hidden',
        marginEnd: 5,
        marginVertical: 5,

        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 4
    },
    colorStripe: {
        width: 50,
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
        minHeight: 80,
    },
    nameText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    chText: {
        fontSize: 24,
        fontWeight: '500',
    },
})
