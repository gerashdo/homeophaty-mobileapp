import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { InputContainer } from '../../components/InputContainer';
import { SearchInput } from '../../components/SearchInput';
import { MedicineContext } from './MedicineContext';
import { MedicineSimpleCard } from './MedicineSimpleCard';
import { ThemeContext } from '../theme/ThemeContext';
import { appStyles } from '../../theme/appTheme';



export const MedicineSearchForm = () => {

    const { medicineState: { medicines }, newMedicineState } = useContext( MedicineContext )
    const { theme:{ colors }} = useContext( ThemeContext )
    
    const { onChange, medicineData } = newMedicineState
    const { medicines:innerMedicines } = medicineData

    return (
        <View style={[ appStyles.globalMargin ,{ 
            flex: 1,
        }]}>
            <SearchInput onSearch={()=>{}} textColor='black' />
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
                            onPress={ ( medicine ) => onChange([ medicine, ...innerMedicines ], 'medicines') }
                        />
                    ))
                }
                </View>
            </BottomSheetScrollView>
        </View>
    )
}
