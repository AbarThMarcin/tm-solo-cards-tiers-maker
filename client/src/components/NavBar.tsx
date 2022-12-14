import React from 'react'
import { Navbar as NavbarBS, Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import logoNav from '../assets/images/logos/logo-nav.png'
import { LinkToTop } from './LinkToTop'

interface Props {
   setTiersClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavBar: React.FC<Props> = ({ setTiersClicked }) => {
   const { user } = useUser()

   return (
      <NavbarBS className="custom-navbar shadow-md" variant="dark" expand="md" sticky="top">
         <Container>
            {/* Logo */}
            <LinkToTop className="navbar-brand" to="/">
               <img src={logoNav} height={43} alt="mars-logo-nav" />
            </LinkToTop>
            <NavbarBS.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
            <NavbarBS.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <Nav.Link as={LinkToTop} to="/">
                     Home
                  </Nav.Link>
                  <Nav.Link as={LinkToTop} to="/about">
                     About
                  </Nav.Link>
                  <Nav.Link as={LinkToTop} to="/lists">
                     Tiers Maker
                  </Nav.Link>
                  <Nav.Link as={LinkToTop} to="/cards">
                     Cards List
                  </Nav.Link>
                  <Nav.Link as={LinkToTop} to="/tm-solo-game">
                     TM Solo Game
                  </Nav.Link>

                  {user ? (
                     <>
                        <Nav.Link as={NavLink} to="/account" onClick={() => setTiersClicked(false)}>
                           Account
                        </Nav.Link>
                     </>
                  ) : (
                     <Nav.Link as={NavLink} to="/signin" onClick={() => setTiersClicked(false)}>
                        Sign In
                     </Nav.Link>
                  )}
               </Nav>
            </NavbarBS.Collapse>
         </Container>
      </NavbarBS>
   )
}
