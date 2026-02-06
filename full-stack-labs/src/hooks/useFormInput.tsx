import React, { useState } from "react";


type Validation = {
    isValid: boolean;
    message?: string;
}


// Hook to handle state of form inputs
export function useFormInput(initialValue = "") {
    const [value, setValue] = useState<string>(initialValue);
    const [message, setMessage] = useState<string | null>(null);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValue(event.target.value);
        setMessage(null);
    }

    const validateForm = (
        validator: (value: string) => string | null
    ): Validation => {
        const error = validator(value);

        if(error) {
            setMessage(error);
            return { isValid: false, message: error}
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