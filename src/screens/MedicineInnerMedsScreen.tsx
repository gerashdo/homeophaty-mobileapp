import React, { useContext } from 'react'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { RowMap, SwipeListView } from 'react-native-swipe-list-view'

import { FabButton } from '../components/FabButton'
import { BasicMedicineListItem } from '../components/medicine/BasicMedicineListItem'
import { SwapListHiddenButton } from '../components/SwapListHiddenButton'
import { SwapListHiddenItems } from '../components/SwapListHiddenItems'
import { ThemeContext } from '../context/theme/ThemeContext'
import { Medicine } from '../interfaces/medicine'
import { ScreenTemplate } from './ScreenTemplate'
import { EmptyScreenMessage } from '../components/EmptyScreenMessage'
import { appStyles } from '../theme/appTheme';
import { BottomPrincipalButton } from '../components/BottomPrincipalButton'
import { StackScreenProps } from '@react-navigation/stack'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { useMedicineNewEdit } from '../hooks/useMedicineNewEdit'
import { useCustomBottomSheetModal } from '../hooks/useCustomBottomSheetModal'
import { AddInnerMedsModalContent } from '../components/medicine/AddInnerMedsModalContent'
import { OverLayerScreenButton } from '../components/OverLayerScreenButton'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineInnerMedsScreen'>{}

export const MedicineInnerMedsScreen = ({ navigation, route }:Props) => {
    const { height, width } = useWindowDimensions()
    const { medicine } = route.params

    const { theme: { danger }} = useContext( ThemeContext )
    const { 
        medicines, 
        isErrorCreate, 
        isErrorUpdate,
        onChange, 
        submit, 
    } = useMedicineNewEdit({ medicine })

    // Bottom sheet
    const { 
        isModalOpen,
        snapPoints,
        bottomSheetModalRef,
        handleCloseModal, 
        handlePresentModalPress,
    } = useCustomBottomSheetModal([ '30%', '65%', '90%' ])

    // Form
    const handleDelete = ( medicine: Medicine, rowMap: RowMap<Medicine>) => {
        onChange( medicines.filter( med => (
            medicine._id !== med._id
        )), 'medicines' )
    }

    const handleSubmitForm = async() => {
        await submit()
        if( !isErrorCreate && !isErrorUpdate ){
            if( medicine ) return navigation.navigate('MedicineScreen', { medicine })
            navigation.popToTop()
        }
    }

    return (
        <BottomSheetModalProvider>
            <ScreenTemplate>
                <>
                    {
                        isModalOpen && (
                            <OverLayerScreenButton onPress={ handleCloseModal }/>
                        )
                    }
                </>
                
                <View style={[{ flex: 1, marginVertical: 10 }]}>
                    <FabButton 
                        iconName='add'
                        onPress={ handlePresentModalPress }
                        style={{
                            zIndex: 400,
                            bottom: 90,
                        }}
                    />
                    
                    <BottomPrincipalButton 
                        text='Guardar'
                        style={[ {
                            width: width - 30,
                            bottom: 20,
                            zIndex: 300,
                        }]}
                        onPress={ handleSubmitForm }
                    />
                    
                    {
                        medicines.length > 0
                            ? (
                                <>
                                <SwipeListView
                                    useFlatList={ true }
                                    data={ medicines }
                                    renderItem={ ({ item }, rowMap) => (
                                        <View
                                            style={ appStyles.globalMargin }
                                        >
                                            <BasicMedicineListItem 
                                                key={ item._id } 
                                                medicine={ item }
                                            />
                                        </View>
                                    )}
                                    keyExtractor={ ( item ) => item._id }
                                    renderHiddenItem={ (data, rowMap) => (
                                        <SwapListHiddenItems>
                                            <View />
                                            <View style={{
                                                flexDirection: 'row-reverse',
                                            }}>
                                                <SwapListHiddenButton 
                                                    iconName='trash'
                                                    backgroundColor={ danger }
                                                    onPress={ () => handleDelete( data.item , rowMap )}
                                                />
                                            </View>
                                        </SwapListHiddenItems>
                                    )}
                                    rightOpenValue={-75}
                                    disableRightSwipe
                                />
                                </>
                            ):(
                                <EmptyScreenMessage 
                                    message='Agrega los medicamentos con el boton +'
                                />
                            )
                    }
                </View>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backgroundStyle={{ borderRadius: 30,}}
                    onDismiss={ handleCloseModal }
                >
                    <AddInnerMedsModalContent 
                        onCloseModal={ handleCloseModal }
                    />
                </BottomSheetModal>

            </ScreenTemplate>
        </BottomSheetModalProvider>

    )
}

