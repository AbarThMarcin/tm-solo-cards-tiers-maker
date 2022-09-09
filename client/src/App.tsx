import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { NavBar } from './components/NavBar'
import { UserInterface } from './interfaces/userInterface'
import { About } from './pages/About'
import { Account } from './pages/Account'
import { CardsList } from './pages/CardsList'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Singup } from './pages/Singup'
import { TiersMaker } from './pages/TiersMaker'
import { TMSoloGame } from './pages/TMSoloGame'

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
         <main>
            <Container>
               <Routes>
                  <Route path="/" element={<Home user={user} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/tiers-maker" element={<TiersMaker user={user} />} />
                  <Route path="/cards" element={<CardsList />} />
                  <Route path="/tm-solo-game" element={<TMSoloGame />} />
                  <Route path="/signin" element={<Signin setUser={setUser} />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/signup" element={<Singup />} />
               </Routes>
            </Container>
         </main>
         <Footer />
      </>
   )
}
