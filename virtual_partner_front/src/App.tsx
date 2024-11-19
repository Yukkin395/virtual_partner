import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Test from './pages/Test'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/"></Link>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
