import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { getTiersLists } from '../../api/apiTiersList'
import { useUser } from '../../context/UserContext'
import { Lists } from './Lists'
import { useLists } from '../../context/ListsContext'
import { ACTIONS_LISTS } from '../../store/actions/actionsLists'
import { ListDetails } from './ListDetails'
import { ListNewRate } from './ListNewRate'
import { NoTiersList } from '../../components/tierlists/NoTiersList'
import { Loading } from '../Loading'
import { useNavigateToTop } from '../../hooks/useNavigateToTop'

interface Props {
   setTiersClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const TiersMaker: React.FC<Props> = ({ setTiersClicked }) => {
   const navigate = useNavigateToTop()
   const { user } = useUser()
   const { stateLists, dispatchLists } = useLists()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      if (!user) {
         setTiersClicked(true)
         navigate('/signin')
         return
      }

      const fetchLists = async () => {
         const data = await getTiersLists(user.token)
         setIsLoading(false)
         if (data.length === 0) return
         dispatchLists({ type: ACTIONS_LISTS.SET_LISTS, payload: data })
      }

      fetchLists()
   }, [user])

   return (
      <article>
         <section className="lists-section-content article-section-content justify-content-start">
            {isLoading ? (
               <Loading large={true} forPage={true} />
            ) : (
               <Routes>
                  <Route index element={<Lists stateLists={stateLists} />} />
                  <Route path=":listName/*">
                     <Route
                        index
                        element={
                           <ListDetails />
                        }
                     />
                     <Route path="new-rate" element={<ListNewRate />} />
                     <Route path="*" element={<NoTiersList />} />
                  </Route>
               </Routes>
            )}
         </section>
      </article>
   )
}
