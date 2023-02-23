import React from 'react'
import { Text, View } from 'react-native'
import { ScreenTemplate } from './ScreenTemplate'

export const MedicineInnerMedsScreen = () => {

    // const { theme: { danger }} = useContext( ThemeContext )
    // const handleDelete = ( medicine: Medicine, rowMap: RowMap<Medicine>) => {
    //     rowMap[ medicine._id ].closeRow()
    //     onDelete( medicine )
    // }
    
    return (
        <ScreenTemplate>

            {/* <View>
                <SwipeListView
                    ListHeaderComponent={ <FirstSection 
                        onChange={ onChange }
                        form={ form }
                    /> }
                    useFlatList={ true }
                    data={ form.medicines }
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
            </View> */}

        </ScreenTemplate>
    )
}
