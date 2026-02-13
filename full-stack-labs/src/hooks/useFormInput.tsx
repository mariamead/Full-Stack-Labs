import { useState } from "react";


export type Validation = {
    isValid: boolean;
    message?: string;
}


// Hook to handle state of form inputs
export function useFormInput(
    formServiceMethod: (initialValue: string) => Validation,
    initialState: string= ""
) {
    const [value, setValue] = useState<string>(initialState);
    const [message, setMessage] = useState<string | null |undefined>(null);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValue(event.target.value);
        setMessage(null);
    }

    const validateForm = (): Validation => {
        const error = formServiceMethod(value);

        if(!error.isValid) {
            setMessage(error.message ?? null);
            return { isValid: false, message: error.message ?? undefined}
        }
        setMessage(null);
        return {isValid: true};
        
    }
    

    return {
        value,
        onChange,
        setValue,
        message,
        setMessage,
        validateForm
    };
}