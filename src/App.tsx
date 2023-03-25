import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header/Header'

import { Home } from './pages/Home'
import { Photographer } from './pages/Photographer'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="photographer/:id" element={<Photographer />} />
          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
