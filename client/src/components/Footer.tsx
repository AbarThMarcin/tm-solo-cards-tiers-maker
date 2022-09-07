import React from 'react'
import { Container } from 'react-bootstrap'
import logoMini from '../assets/images/logo-mini.png'
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'

export const Footer: React.FC = () => {
   return (
      <footer>
         <hr />
         <Container className="custom-footer d-flex align-items-center pb-2">
            <img src={logoMini} height="25" alt="mars-mini-logo" />
            <span className="ms-2">All Rights Reserved.</span>
            <a
               className="contact-icon ms-auto me-2" 
               href="https://www.facebook.com/marcin.wesolowski89"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaFacebook size="25px" />
            </a>
            <a
               className="contact-icon me-2" 
               href="https://www.linkedin.com/in/marcin-weso%C5%82owski-10bba613b/"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaLinkedin size="25px" />
            </a>
            <a
               className="contact-icon me-2" 
               href="https://www.instagram.com/marcin.wesolowski89/"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaInstagram size="25px" />
            </a>
            <a
               className="contact-icon" 
               href="https://github.com/AbarThMarcin"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaGithub size="25px" />
            </a>
         </Container>
      </footer>
   )
}
