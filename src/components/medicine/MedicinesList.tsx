import React, { useContext } from 'react'
import { View } from 'react-native'
import { RowMap, SwipeListView } from 'react-native-swipe-list-view'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Medicine } from '../../interfaces/medicine'
import { SwapListHiddenButton } from '../SwapListHiddenButton'
import { SwapListHiddenItems } from '../SwapListHiddenItems'
import { MedicineListItem } from './MedicineListItem'

interface Props {
    data: Medicine[];
    onItemPress?: ( item: Medicine ) => void;
    onItemEdit?: ( item: Medicine ) => void;
    onItemDelete?: ( item: Medicine ) => void;
    onEndReached?: () => void;
}

export const MedicinesList = ({ 
    data, 
    onItemPress = () => {}, 
    onItemEdit = () => {},
    onItemDelete = () => {},
    onEndReached,
}:Props) => {

    const { theme:{ secondary, danger }} = useContext( ThemeContext )

    const handleDelete = ( medicine: Medicine, rowMap: RowMap<Medicine>) => {
        rowMap[ medicine._id ].closeRow()
        onItemDelete( medicine )
    }

    return (
        <SwipeListView
            useFlatList={ true }
            data={ data }
            renderItem={ ({ item }, rowMap) => (
                <MedicineListItem 
                    key={ item._id } 
                    medicine={ item }
                    onPress={ onItemPress }
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
                        <SwapListHiddenButton 
                            iconName='create'
                            backgroundColor={ secondary }
                            onPress={ () => onItemEdit( data.item )}
                        />
                    </View>
                </SwapListHiddenItems>
            )}
            rightOpenValue={-155}
            disableRightSwipe
            onEndReachedThreshold={ 0.3 }
            onEndReached={ onEndReached }
        />
    )
}
