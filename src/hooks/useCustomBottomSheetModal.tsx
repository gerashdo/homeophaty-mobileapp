import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { useBoundStore } from "../store/useBoundStore";


export const useCustomBottomSheetModal = ( snapPointsList: string[] ) => {

    const isModalOpen = useBoundStore(( state ) => state.isModalOpen )
    const openModal = useBoundStore(( state ) => state.openModal )
    const closeModal = useBoundStore(( state ) => state.closeModal )

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => snapPointsList, []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        openModal()
    }, []);

    const handleCloseModal = useCallback( () => {
        bottomSheetModalRef.current?.close()
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
