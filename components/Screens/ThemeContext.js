import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({ backgroundColor: '#fff', textColor: '#000' });

    const updateTheme = (newTheme) => {
        setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
