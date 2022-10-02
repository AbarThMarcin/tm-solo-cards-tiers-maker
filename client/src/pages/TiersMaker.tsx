import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getTiersLists } from '../api/apiTiersList'
import { ListSnap } from '../components/tierlists/ListSnap'
import { ListCreateSnap } from '../components/tierlists/ListCreateSnap'
import { ListLinks } from '../components/tierlists/ListLinks'
import { useUser } from '../context/UserContext'
import { ListsLayout } from './tiersmaker/ListsLayout'
import { useLists } from '../context/ListsContext'
import { ACTIONS_LISTS } from '../store/actions/actionsLists'

interface Props {
   setTiersClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const TiersMaker: React.FC<Props> = ({ setTiersClicked }) => {
   const navigate = useNavigate()
   const { user } = useUser()
   const { stateLists, dispatchLists, selectedListId } = useLists()
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
         <section className="section justify-content-start">
            {user && (
               <Routes>
                  <Route
                     index
                     element={
                        <>
                           <header className="mt-5">
                              <p>
                                 Welcome to the tiers list! Lorem ipsum dolor sit amet consectetur,
                                 adipisicing elit. Harum amet mollitia quidem officiis cupiditate
                                 obcaecati autem nam, eaque odio officia assumenda distinctio quae
                                 et ab, accusantium optio id. Aspernatur, illo? Lorem ipsum dolor
                                 sit amet consectetur adipisicing elit. Doloremque porro obcaecati
                                 labore nemo ut tenetur asperiores minus soluta consequuntur,
                                 possimus dolores repellendus, quisquam sed ipsam, adipisci ex
                                 itaque corporis. Enim.
                              </p>
                           </header>
                           {isLoading ? (
                              <div>Loading...</div>
                           ) : (
                              <>
                                 {true &&
                                    (stateLists.length === 0 ? (
                                       // No tiers lists
                                       <ListCreateSnap />
                                    ) : (
                                       // Tiers lists
                                       <div className="d-flex w-100 h-100 mt-5">
                                          <ListLinks />
                                          {!selectedListId ? <ListCreateSnap /> : <ListSnap />}
                                       </div>
                                    ))}
                              </>
                           )}
                        </>
                     }
                  />

                  <Route path=":listName/*" element={<ListsLayout />} />
               </Routes>
            )}
         </section>
      </article>
   )
}
