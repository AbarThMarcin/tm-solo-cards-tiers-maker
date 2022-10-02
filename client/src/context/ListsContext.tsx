import { createContext, useContext, useReducer, useState } from 'react'
import { ListActionInt, ListInterface } from '../interfaces/listInterface'
import { reducerLists } from '../store/reducers/reducerLists'

interface ListsContextInt {
   stateLists: ListInterface[]
   dispatchLists: React.Dispatch<ListActionInt>
   selectedListId: string | null
   setSelectedListId: React.Dispatch<React.SetStateAction<string | null>>
}
const ListsContext = createContext<ListsContextInt>({
   stateLists: [],
   dispatchLists: () => {},
   selectedListId: null,
   setSelectedListId: () => {},
})

interface Props {
   children?: React.ReactNode
}

export const useLists = () => useContext(ListsContext)

export const ListsProvider: React.FC<Props> = ({ children }) => {
   const [stateLists, dispatchLists] = useReducer(reducerLists, [])
   const [selectedListId, setSelectedListId] = useState<string | null>(null)

   return (
      <ListsContext.Provider
         value={{ stateLists, dispatchLists, selectedListId, setSelectedListId }}
      >
         {children}
      </ListsContext.Provider>
   )
}
