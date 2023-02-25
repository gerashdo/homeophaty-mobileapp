import { useState } from 'react';

export const useForm = <T extends Object>( initState: T ) => {

    const [state, setState] = useState( initState );

    const onChange = <K extends keyof T>( value: T[K], field: K ) => {
        setState({
            ...state,
            [field]: value
        });
    }

    const setFormValues = ( form: T ) => {
        setState({
            ...state,
            ...form,
        })
    }

    const resetValues = () => {
        setState( initState )
    }

    return {
        ...state,
        form: state,
        onChange,
        setFormValues,
        resetValues,
    }
}