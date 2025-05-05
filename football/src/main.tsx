import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter ,Route, Routes}from 'react-router-dom'
import './index.css'
import App from './pages/matchs.tsx'
import NotFound from './pages/NotFound.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Teams from './pages/Teams.tsx'
import Competitions from './pages/Competitions.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/match' element={<App/>} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="/team" element={<Teams/>}/>
        <Route path="/competition" element={<Competitions/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
