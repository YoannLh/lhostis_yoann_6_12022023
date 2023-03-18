import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header/Header'

import { Home } from './Pages/Home'
import { Photographer } from './Pages/Photographer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="photographer/:id" element={<Photographer />} />
          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
