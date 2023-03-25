import React, { useContext } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Modal } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext'
import { appStyles } from '../theme/appTheme'
import { Button } from './Button'

interface Props {
    message: string;
    acceptMessage: string;
    visible: boolean;
    onCancel?: () => void;
    onAccept?: () => void;
    acceptColor?: string;
}

export const AlertModal = ({ message, visible, acceptMessage, acceptColor, onCancel, onAccept }:Props) => {
    const { width } = useWindowDimensions()
    const { theme:{ colors }} = useContext( ThemeContext )

    return (
        <Modal
            visible={ visible }
            animationType='fade'
            transparent={ true }
        >
            <View style={ styles.generalContainer }>
                <View style={[ styles.modalContainer, {
                    backgroundColor: colors.background,
                    width: width - 60,
                }]}>
                    <>
                        <Text style={[ 
                            appStyles.subTitle, 
                            styles.message,
                            { 
                                color: colors.text, 
                            } 
                        ]}>{ message }</Text>
                    </>
                    <View style={ styles.buttonsContainer }>
                        <Button 
                            text={ acceptMessage }
                            onPress={ onAccept }
                            style={{
                                backgroundColor: acceptColor || colors.primary,
                            }}
                        />
                        <Button 
                            text='No, cancelar' 
                            onPress={ onCancel }
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        borderRadius: 20,
        gap: 30,
        paddingVertical: 20,
        paddingHorizontal: 25,
    },
    message: {
        textAlign: 'center',
    },
    buttonsContainer: {
        gap: 20,
    }
})
