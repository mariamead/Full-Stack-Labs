import { useState } from "react";


type FormErrors = {
    name?: string;
    department?: string;
}

type Validator = {
    nameValidator: (value: string) => string | null;
    departmentValidator: (value: string) => string | null;
}

// Hook to handle state of form inputs
export function useFormInput() {
    const [name, setName] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [error, setError] = useState<FormErrors>({});

    const validateForm = ({ nameValidator, departmentValidator }: Validator) => {
        const nameError = nameValidator(name);
        const departmentError = departmentValidator(department);
        setError({
            name: nameError ?? "",
            department: departmentError ?? ""
        });

        return !nameError && !departmentError;
    }  
    

    return {
        name,
        setName,
        department,
        setDepartment,
        error,
        setError,
        validateForm
    };
}