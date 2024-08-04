import './index.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SharePage from './pages/SharePage';
import ErrorPage from './pages/ErrorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room/:roomCode' element={<SharePage />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </>
    
  );
}

export default App;
