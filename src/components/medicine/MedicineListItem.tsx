import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Medicine, MedicineType } from '../../interfaces/medicine'
import { appStyles } from '../../theme/appTheme';

interface Props {
    medicine: Medicine;
    onPress?: ( item?: Medicine ) => void;
}

export const MedicineListItem = ({ medicine, onPress = () => {} }:Props) => {

    const { theme: { colors, secondary, elementsBackground }} = useContext( ThemeContext )

    return (
        <View style={[ appStyles.globalMargin ]}>
        <TouchableOpacity
            activeOpacity={ 1 }
            onPress={ () => onPress( medicine ) }
        >
            <View style={{
                ...styles.container,
                shadowColor: colors.text,
                backgroundColor: elementsBackground,
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
                    <Icon
                        name='chevron-forward'
                        color={ colors.text }
                        size={ 30 }
                        style={ styles.icon }
                    />
                </View>
            </View>
        </TouchableOpacity>
        </View>
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
