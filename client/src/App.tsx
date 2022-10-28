import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { useModal } from './context/ModalContext'
import { About } from './pages/About'
import { Account } from './pages/Account'
import { CardsListPage } from './pages/CardsListPage'
import { Home } from './pages/Home'
import { NoMatch } from './pages/NoMatch'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Singup'
import { TiersMaker } from './pages/tiersmaker/TiersMaker'
import { TMSoloGame } from './pages/TMSoloGame'
import { Modal } from './components/Modal'
import { Footer } from './components/Footer'
import { NavBar } from './components/NavBar'
import { FiltersProvider } from './context/FiltersContext'
import { ModalCard } from './components/ModalCard'

export const App: React.FC = () => {
   const [tiersClicked, setTiersClicked] = useState(false)
   const { modal, modalCardId } = useModal()

   return (
      <>
         <NavBar setTiersClicked={setTiersClicked} />
         <main>
            <Container className="page-container">
               <Routes>
                  <Route index element={<Home setTiersClicked={setTiersClicked} />} />
                  <Route path="home" element={<Home setTiersClicked={setTiersClicked} />} />
                  <Route path="about" element={<About />} />
                  <Route
                     path="lists/*"
                     element={<TiersMaker setTiersClicked={setTiersClicked} />}
                  />

                  <Route
                     path="cards"
                     element={
                        <FiltersProvider>
                           <CardsListPage />
                        </FiltersProvider>
                     }
                  />
                  <Route path="tm-solo-game" element={<TMSoloGame />} />
                  <Route
                     path="signin"
                     element={
                        <Signin tiersClicked={tiersClicked} setTiersClicked={setTiersClicked} />
                     }
                  />
                  <Route path="account" element={<Account />} />
                  <Route
                     path="signup"
                     element={
                        <Signup tiersClicked={tiersClicked} setTiersClicked={setTiersClicked} />
                     }
                  />
                  <Route path="*" element={<NoMatch />} />
               </Routes>
            </Container>
         </main>
         <Footer />
         {modal.show && <Modal />}
         {modalCardId !== 0 && <ModalCard />}
      </>
   )
}
