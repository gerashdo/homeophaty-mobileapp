import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { RowMap, SwipeListView } from 'react-native-swipe-list-view'
import { FabButton } from '../components/FabButton'

import { BasicMedicineListItem } from '../components/medicine/BasicMedicineListItem'
import { SwapListHiddenButton } from '../components/SwapListHiddenButton'
import { SwapListHiddenItems } from '../components/SwapListHiddenItems'
import { MedicineContext } from '../context/medicine/MedicineContext'
import { ThemeContext } from '../context/theme/ThemeContext'
import { Medicine } from '../interfaces/medicine'
import { ScreenTemplate } from './ScreenTemplate'
import { MedicineSearchForm } from '../context/medicine/MedicineSearchForm'
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo'
import { EmptyScreenMessage } from '../components/EmptyScreenMessage'
import { appStyles } from '../theme/appTheme';
import { BottomPrincipalButton } from '../components/BottomPrincipalButton'
import { StackScreenProps } from '@react-navigation/stack'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineInnerMedsScreen'>{}

export const MedicineInnerMedsScreen = ({ navigation }:Props) => {
    const { height, width } = useWindowDimensions()

    const { theme: { danger }} = useContext( ThemeContext )
    const { newMedicineState, createMedicine, medicineState } = useContext( MedicineContext )
    const { errorMessage } = medicineState
    const { medicineData: { medicines }, onChange } = newMedicineState
    const [ isModalOpen, setIsModalOpen ] = useState( false )

    const handleDelete = ( medicine: Medicine, rowMap: RowMap<Medicine>) => {
        onChange( medicines.filter( med => (
            medicine._id !== med._id
        )), 'medicines' )
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => [ '30%', '65%', '90%' ], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setIsModalOpen( true )
    }, []);

    const handleCloseModal = useCallback( () => {
        bottomSheetModalRef.current?.close()
        setIsModalOpen( false )
    }, [])

    const handleSubmitForm = async() => {
        await createMedicine()
        // if( !errorMessage ) navigation.popToTop()
    }

    return (
        <BottomSheetModalProvider>
            <ScreenTemplate>
                <>
                    {
                        isModalOpen && (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    zIndex: 999,
                                    position: 'absolute',
                                    height,
                                    width,
                                }}
                                activeOpacity={ 1 }
                                onPress={ handleCloseModal }
                            ></TouchableOpacity>
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
                <View style={{ flex: 1, }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View />
                        <SimpleButtonWithLogo 
                            text='Listo'
                            onPress={ handleCloseModal }
                        />
                    </View>
                    <View style={{ marginTop: 10, flex: 1 }}>
                        <MedicineSearchForm />
                    </View>
                </View>
                </BottomSheetModal>

            </ScreenTemplate>
        </BottomSheetModalProvider>

    )
}

