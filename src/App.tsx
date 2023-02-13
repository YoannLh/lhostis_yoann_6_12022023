import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { Home } from './Pages/Home'
import { Photographer } from './Pages/Photographer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/photographer'} element={<Photographer />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
