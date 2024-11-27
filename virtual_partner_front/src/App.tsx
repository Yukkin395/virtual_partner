import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Memory } from './pages/Memory'
import { Profile } from './pages/Profile'
import { Extra } from './pages/Extra'
import { Development } from './pages/Development'
import { useEffect, useState } from 'react'
import { Loading } from './components/Loading'
import { Footer } from './features/Nuvigation/Footer'

function App() {
  const [loading, setLoading] = useState(true);

  // ローディング状態の管理
  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/memory' element={<Memory />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/extra' element={<Extra />} />
            <Route path='/development' element={<Development />} />
          </Routes>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 w-full max-w-md z-40">
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
