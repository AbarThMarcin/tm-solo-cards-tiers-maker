import React from 'react'
import { Navbar as NavbarBS, Container } from 'react-bootstrap'
import { Nav, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

interface Props {
   setTiersClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavBar: React.FC<Props> = ({ setTiersClicked }) => {
   const navigate = useNavigate()
   const { user, setUser } = useUser()

   const handleSignout = () => {
      localStorage.removeItem('user')
      setUser(null)
      navigate('/')
   }

   return (
      <NavbarBS
         style={{ zIndex: '0' }}
         className="custom-navbar shadow-md"
         variant="dark"
         expand="lg"
         sticky="top"
      >
         <Container>
            {/* Logo */}
            <Link className="navbar-brand" to="/">
               Navbar
            </Link>
            <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
            <NavbarBS.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <Nav.Link as={NavLink} to="/">
                     Home
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/about">
                     About
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/lists">
                     Tiers Maker
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cards">
                     Cards List
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/tm-solo-game">
                     TM Solo Game
                  </Nav.Link>

                  {user ? (
                     <NavDropdown title="Account" id="basic-nav-dropdown">
                        <NavDropdown.Item as={NavLink} to="/account">
                           Settings
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleSignout}>Logout</NavDropdown.Item>
                     </NavDropdown>
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
