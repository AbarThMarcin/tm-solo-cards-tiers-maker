import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/css/app.css'
import { App } from './App'
import { UserProvider } from './context/UserContext'
import { ModalProvider } from './context/ModalContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <Router>
         <UserProvider>
            <ModalProvider>
               <App />
            </ModalProvider>
         </UserProvider>
      </Router>
   </React.StrictMode>
)
