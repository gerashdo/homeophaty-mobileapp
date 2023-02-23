import React from 'react'
import { Text, View } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Medicine } from '../../interfaces/medicine'
import { MedicineListItem } from './MedicineListItem'

interface Props {
    data: Medicine[];
    onItemPress: ( item?: Medicine ) => void;
}

export const MedicinesList = ({ data, onItemPress }:Props) => {

    return (
        <SwipeListView 
            data={ data }
            renderItem={ ({ item }, rowMap) => (
                <MedicineListItem 
                    key={ item._id } 
                    medicine={ item }
                    onPress={ onItemPress }
                />
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
    )
}
