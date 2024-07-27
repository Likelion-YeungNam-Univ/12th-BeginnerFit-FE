import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        pwCheck: '',
        name: '',
        height: 0,
        weight: 0,
        targetWeight: 0,
        date: '',
        targetDate: '',
        exerciseTime: 0,
        categories: {},
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};
