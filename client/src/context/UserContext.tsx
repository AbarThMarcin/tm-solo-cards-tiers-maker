import { createContext, useContext, useState } from 'react'
import { UserInterface } from '../interfaces/userInterface'

interface UserContextInt {
   user: UserInterface | null
   setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
}
const UserContext = createContext<UserContextInt>({ user: null, setUser: () => {} })

interface Props {
   children?: React.ReactNode
}

export const useUser = () => useContext(UserContext)

export const UserProvider: React.FC<Props> = ({ children }) => {
   const [user, setUser] = useState<UserInterface | null>(getUser())

   function getUser(): UserInterface | null {
      const userInfo = localStorage.getItem('user')
      if (userInfo) {
         return JSON.parse(userInfo)
      } else {
         return null
      }
   }

   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
