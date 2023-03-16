import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";


export const useCustomBottomSheetModal = ( snapPointsList: string[] ) => {

    const [ isModalOpen, setIsModalOpen ] = useState( false )

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => snapPointsList, []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setIsModalOpen( true )
    }, []);

    const handleCloseModal = useCallback( () => {
        bottomSheetModalRef.current?.close()
        setIsModalOpen( false )
    }, [])

    return {
        bottomSheetModalRef,
        isModalOpen,
        snapPoints,
        handlePresentModalPress,
        handleCloseModal,
    }
}
