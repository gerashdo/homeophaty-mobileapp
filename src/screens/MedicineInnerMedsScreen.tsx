import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { RowMap, SwipeListView } from 'react-native-swipe-list-view'
import { FabButton } from '../components/FabButton'

// import {
//     BottomSheetModal,
//     BottomSheetModalProvider,
//   } from '@gorhom/bottom-sheet';

import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'


import { BasicMedicineListItem } from '../components/medicine/BasicMedicineListItem'
import { SwapListHiddenButton } from '../components/SwapListHiddenButton'
import { SwapListHiddenItems } from '../components/SwapListHiddenItems'
import { MedicineContext } from '../context/medicine/MedicineContext'
import { ThemeContext } from '../context/theme/ThemeContext'
import { Medicine } from '../interfaces/medicine'
import { ScreenTemplate } from './ScreenTemplate'

export const MedicineInnerMedsScreen = () => {

    const { theme: { danger, buttonTextColor, colors }} = useContext( ThemeContext )
    const { newMedicineState } = useContext( MedicineContext )
    const { medicineData: { medicines} } = newMedicineState

    const handleDelete = ( medicine: Medicine, rowMap: RowMap<Medicine>) => {
        rowMap[ medicine._id ].closeRow()
        // onDelete( medicine )
    }




    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);





    return (
        <BottomSheetModalProvider>

        <ScreenTemplate>
            <View style={{ flex: 1 }}>
                <FabButton 
                    iconName='add'
                    onPress={ handlePresentModalPress }
                />
                <SwipeListView
                    useFlatList={ true }
                    data={ medicines }
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

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
            <View style={{ flex: 1, }}>
                <Text>Awesome 🎉</Text>
            </View>
            </BottomSheetModal>

        </ScreenTemplate>
        </BottomSheetModalProvider>

    )
}
