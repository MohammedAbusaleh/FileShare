import './index.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SharePage from './pages/SharePage';
import ErrorPage from './pages/ErrorPage';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dd' element={<SharePage />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
