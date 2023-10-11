import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Utils/themeOptions";


const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {

    //fetching theme from local storage..if new user comes he will get dart by default..
    const defaultValue = JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value
    const [theme, setTheme] = useState(defaultValue);

    const values = {
        theme, 
        setTheme
    };

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);