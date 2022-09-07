import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserInterface } from '../App'

interface Props {
   user: UserInterface | null
}

export const TiersMaker: React.FC<Props> = ({ user }) => {
   const navigate = useNavigate()

   useEffect(() => {
      if (!localStorage.getItem('user')) navigate('/signin')
   }, [])

   return <section>
      {!user ? (
         <div></div>
      ) : (
         <div>TiersMaker</div>
      )}
   </section>
}
