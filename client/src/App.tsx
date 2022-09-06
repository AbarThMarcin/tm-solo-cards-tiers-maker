import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import { About } from './pages/About'
import { Cards } from './pages/Cards'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Singup } from './pages/Singup'
import { Tiers } from './pages/Tiers'

function App() {
   return (
      <Container>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tiers" element={<Tiers />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Singup />} />
         </Routes>
      </Container>
   )
}

export default App
