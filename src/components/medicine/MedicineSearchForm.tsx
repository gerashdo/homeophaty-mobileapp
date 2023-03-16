import React, { useContext } from 'react'
import { View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { SearchInput } from '../SearchInput';
import { MedicineSimpleCard } from './MedicineSimpleCard';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { appStyles } from '../../theme/appTheme';
import { MedicineContext } from '../../context/medicine/MedicineContext';
import { Medicine } from '../../interfaces/medicine';
import { CustomActivityIndicator } from '../ActivityIndicator';
import { useMedicinesSearch } from '../../hooks/useMedicinesSearch';


export const MedicineSearchForm = () => {

    const { theme:{ colors }} = useContext( ThemeContext )
    const { newMedicineState } = useContext( MedicineContext )
    const { medicines, isLoading, searchTermn, setSearchTermn } = useMedicinesSearch()
    
    const { onChange, medicineData } = newMedicineState
    const { medicines:innerMedicines } = medicineData

    const handleAddMedicine = ( medicine: Medicine ) => {
        if( innerMedicines.includes( medicine )) return

        onChange([ medicine, ...innerMedicines ], 'medicines')
    }
    
    // TODO: Cofigure reusability of SwipeList

    return (
        <View style={[ appStyles.globalMargin ,{ 
            flex: 1,
        }]}>
            <SearchInput 
                onSearch={( value ) => setSearchTermn( value ) } 
                textColor='black' 
            />
            {
                isLoading && searchTermn
                    ? ( <CustomActivityIndicator /> )
                    : (
                        <BottomSheetScrollView
                            contentContainerStyle={{
                                flex: 1
                            }}
                        >
                            <View style={{ 
                                borderTopWidth: 1,
                                borderColor: colors.border,
                                marginVertical: 20, 
                            }}>
                            {
                                medicines.map( medicine => (
                                    <MedicineSimpleCard 
                                        key={ medicine._id } 
                                        medicine={ medicine }
                                        onPress={ handleAddMedicine }
                                    />
                                ))
                            }
                            </View>
                        </BottomSheetScrollView>
                    )
            }
            
        </View>
    )
}
