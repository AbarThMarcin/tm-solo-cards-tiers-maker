import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Account: React.FC = () => {
   const navigate = useNavigate()

   useEffect(() => {
      if (!localStorage.getItem('user')) navigate('/signin')
   }, [])
   return (
      <article>
         <section className="section">Account</section>
      </article>
   )
}
