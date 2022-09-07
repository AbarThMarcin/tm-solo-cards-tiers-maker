import React from 'react'
import { Navbar as NavbarBS, Container } from 'react-bootstrap'
import { Nav, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserInterface } from '../App'

interface Props {
   user: UserInterface | null
   setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
}

export const NavBar: React.FC<Props> = ({ user, setUser }) => {
   const navigate = useNavigate()

   const handleSignout = () => {
      localStorage.removeItem('user')
      setUser(null)
      navigate('/')
   }

   return (
      <NavbarBS className="custom-navbar shadow-md" variant="dark" expand="lg" sticky="top">
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
                  <Nav.Link as={NavLink} to="/tiers-maker">
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
                     <Nav.Link as={NavLink} to="/signin">
                        Sign In
                     </Nav.Link>
                  )}
               </Nav>
            </NavbarBS.Collapse>
         </Container>
      </NavbarBS>
   )
}
