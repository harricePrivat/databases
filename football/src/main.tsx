import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter ,Route, Routes}from 'react-router-dom'
import './index.css'
import App from './pages/matchs.tsx'
import NotFound from './pages/NotFound.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Teams from './pages/Teams.tsx'
import Competitions from './pages/Competitions.tsx'
import OneTeams from './pages/OneTeams.tsx'
import OneCompetitions from './pages/OneCompetitions.tsx'
import Predict from './pages/Predict.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path='/match' element={<App/>} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="/team" element={<Teams/>}/>
        <Route path="/team/:nameTeam" element={<OneTeams/>}/>
        <Route path="/andrana" element={<OneTeams/>}/>
        <Route path='/competition/:nameCompetition' element={<OneCompetitions/>}/>
        <Route path="/competition" element={<Competitions/>}/>
        <Route path='/predict' element={<Predict/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
