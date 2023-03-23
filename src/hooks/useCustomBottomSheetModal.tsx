import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useBoundStore } from "../store/useBoundStore";


export const useCustomBottomSheetModal = ( snapPointsList: string[] ) => {

    const isModalOpen = useBoundStore(( state ) => state.isModalOpen )
    const openModal = useBoundStore(( state ) => state.openModal )
    const closeModal = useBoundStore(( state ) => state.closeModal )

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => snapPointsList, []);

    useEffect(() => {
      if( isModalOpen ) return bottomSheetModalRef.current?.present()
      bottomSheetModalRef.current?.close()
    }, [ isModalOpen ])
    
    const handlePresentModalPress = useCallback(() => {
        openModal()
    }, []);

    const handleCloseModal = useCallback( () => {
        closeModal()
    }, [])

    return {
        bottomSheetModalRef,
        isModalOpen,
        snapPoints,
        handlePresentModalPress,
        handleCloseModal,
    }
}
