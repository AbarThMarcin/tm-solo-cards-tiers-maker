import React from 'react'
import { Container } from 'react-bootstrap'
import logoFooter from '../assets/images/logos/logo-footer.png'
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'

export const Footer: React.FC = () => {
   return (
      <footer className='d-flex'>
         <Container className="custom-footer d-flex align-items-center">
            <img src={logoFooter} height="25" alt="mars-logo-footer" />
            <span className="ms-2">All Rights Reserved.</span>
            <a
               className="contact-icon pointer ms-auto me-2" 
               href="https://www.facebook.com/marcin.wesolowski89"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaFacebook size="25px" />
            </a>
            <a
               className="contact-icon pointer me-2" 
               href="https://www.linkedin.com/in/marcin-weso%C5%82owski-10bba613b/"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaLinkedin size="25px" />
            </a>
            <a
               className="contact-icon pointer me-2" 
               href="https://www.instagram.com/marcin.wesolowski89/"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaInstagram size="25px" />
            </a>
            <a
               className="contact-icon pointer" 
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
