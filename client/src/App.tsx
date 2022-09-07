import { createContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { NavBar } from './components/NavBar'
import { About } from './pages/About'
import { Account } from './pages/Account'
import { Cards } from './pages/Cards'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Singup } from './pages/Singup'
import { TiersMaker } from './pages/TiersMaker'
import { TMSoloGame } from './pages/TMSoloGame'

interface Settings {
   gameSpeed: number
   showTotalVP: true
   handSortId: string
   playedSortId: string
   musicVolume: number
   gameVolume: number
}
interface ActiveMatches {
   quickMatch: boolean
   quickMatchId: boolean
   ranked: boolean
}

export interface UserInterface {
   _id: string
   name: string
   email: string
   settings: Settings
   activeMatches: ActiveMatches
   isAdmin: boolean
   token: string
}

export const App: React.FC = () => {
   const [user, setUser] = useState<UserInterface | null>(null)

   useEffect(() => {
      const userInfo = localStorage.getItem('user')
      if (userInfo) {
         const user = JSON.parse(userInfo)
         setUser(user)
      }
   }, [])

   return (
      <>
         <NavBar user={user} setUser={setUser} />
         <Container>
            <Routes>
               <Route path="/" element={<Home user={user} />} />
               <Route path="/about" element={<About />} />
               <Route path="/tiers-maker" element={<TiersMaker user={user} />} />
               <Route path="/cards" element={<Cards />} />
               <Route path="/tm-solo-game" element={<TMSoloGame />} />
               <Route path="/signin" element={<Signin setUser={setUser} />} />
               <Route path="/account" element={<Account />} />
               <Route path="/signup" element={<Singup />} />
            </Routes>
         </Container>
         <Footer />
      </>
   )
}
