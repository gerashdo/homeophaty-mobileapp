import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { SearchInput } from '../../components/SearchInput';
import { MedicineSimpleCard } from '../../components/medicine/MedicineSimpleCard';
import { ThemeContext } from '../theme/ThemeContext';
import { appStyles } from '../../theme/appTheme';
import { MedicineContext } from './MedicineContext';
import { Medicine } from '../../interfaces/medicine';
import { CustomActivityIndicator } from '../../components/ActivityIndicator';
import { useSearch } from '../../hooks/useMedicines';
import { useBoundStore } from '../../store/useBoundStore';


export const MedicineSearchForm = () => {
    const { theme:{ colors }} = useContext( ThemeContext )
    const { newMedicineState } = useContext( MedicineContext )
    const { medicines } = useBoundStore()
    const [ medicinesToSelect, setMedicinesToSelect ] = useState( medicines )
    const [ searchTermn, setSearchTermn ] = useState<string>('')
    const { searchQuery } = useSearch( searchTermn, 'medicines' )

    useEffect(() => {
      if( searchTermn ){
        setMedicinesToSelect( searchQuery.data?.result || [] )
      }else{
        setMedicinesToSelect( medicines )
      }
    }, [ medicines, searchTermn, searchQuery.data ])

    
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
                searchQuery.isLoading && searchTermn
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
                    )
            }
            
        </View>
    )
}
