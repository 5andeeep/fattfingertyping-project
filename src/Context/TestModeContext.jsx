import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({ children }) => {

    const defaultTimer = JSON.parse(localStorage.getItem('timer')) || 15;
    const [testTime, setTestTime] = useState(defaultTimer);

    const values = {
        testTime,
        setTestTime
    }

  return (
    <TestModeContext.Provider value={values}>
        {children}
    </TestModeContext.Provider>
  );
};

export const useTestMode = () => useContext(TestModeContext);