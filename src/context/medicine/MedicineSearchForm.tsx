import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { SearchInput } from '../../components/SearchInput';
import { MedicineSimpleCard } from '../../components/medicine/MedicineSimpleCard';
import { ThemeContext } from '../theme/ThemeContext';
import { appStyles } from '../../theme/appTheme';
import { useSearch } from '../../hooks/useSearch';
import { MedicineContext } from './MedicineContext';
import { Medicine } from '../../interfaces/medicine';


export const MedicineSearchForm = () => {
    const { newMedicineState } = useContext( MedicineContext )
    const { theme:{ colors }} = useContext( ThemeContext )

    const {
        error, 
        valuesFound: medicinesToSelect, 
        search, 
        isLoading
    } = useSearch('medicines', [])

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
                onSearch={( value )=> search( value )} 
                textColor='black' 
            />
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
                    medicinesToSelect.map( medicine => (
                        <MedicineSimpleCard 
                            key={ medicine._id } 
                            medicine={ medicine }
                            onPress={ handleAddMedicine }
                        />
                    ))
                }
                </View>
            </BottomSheetScrollView>
        </View>
    )
}
