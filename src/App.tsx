import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header/Header'

import { Home } from './Pages/Home'
import { Photographer } from './Pages/Photographer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/photographer'} element={<Photographer />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
