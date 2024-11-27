import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Memory } from './pages/Memory'
import { Profile } from './pages/Profile'
import { Extra } from './pages/Extra'
import { Development } from './pages/Development'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/"></Link>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/memory' element={<Memory />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/extra' element={<Extra />} />
          <Route path='/development' element={<Development />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
