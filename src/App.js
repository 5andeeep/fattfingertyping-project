import './App.css';
import Home from './Pages/Home';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './Context/ThemeContext';
import { GlobalStyles } from './Styles/global';
import { ToastContainer } from 'react-toastify'; // both important for toastify
import 'react-toastify/dist/ReactToastify.css'; // (css file) both important for toastify
import { Routes, Route } from 'react-router-dom';
import UserPage from './Pages/UserPage';


function App() {

  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer /> 
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<UserPage />} />
      </Routes>
      
    </ThemeProvider>
    
  );
}

export default App;
