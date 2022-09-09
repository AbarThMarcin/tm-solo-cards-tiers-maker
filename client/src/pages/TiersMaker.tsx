import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserInterface } from '../interfaces/userInterface'

interface Props {
   user: UserInterface | null
}

export const TiersMaker: React.FC<Props> = ({ user }) => {
   const navigate = useNavigate()

   useEffect(() => {
      if (!localStorage.getItem('user')) navigate('/signin')
   }, [])

   return (
      <article>
         <section className="section">
            {!user ? (
               <div></div>
            ) : (
               <div>
                  TiersMaker
                  <span></span>
               </div>
            )}
         </section>
      </article>
   )
}
