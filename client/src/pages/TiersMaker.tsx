import React, { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
   createTiersList,
   deleteTiersList,
   getTiersLists,
   updateTiersList,
} from '../api/apiTiersList'
import { ListInterface, PlayerInterface } from '../interfaces/listInterface'
import { ListSnap } from '../components/tierlists/ListSnap'
import { ListCreateSnap } from '../components/tierlists/ListCreateSnap'
import { ListDetails } from '../components/tierlists/listdetails/ListDetailsLayout'
import { ListLinks } from '../components/tierlists/ListLinks'
import { useUser } from '../context/UserContext'
import { toUrl } from '../utils/strings'

interface Props {
   setTiersClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const MODAL_ONCONTINUE = {
   CREATE_LIST: 'CREATE_LIST',
   DELETE_LIST: 'DELETE_LIST',
}

export const TiersMaker: React.FC<Props> = ({ setTiersClicked }) => {
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const isDetails = useMemo(() => pathname.endsWith('details'), [pathname])
   const { user } = useUser()
   const [lists, setLists] = useState<ListInterface[]>([])
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
         setLists(data)
      }

      fetchLists()
   }, [user])

   const createList = async (listName: string): Promise<any> => {
      if (!user) return
      const res = await createTiersList(user.token, { name: listName })
      if (res.success) {
         const newList = res.data
         setLists([...lists, newList])
         navigate(toUrl(listName))
      }
      return res
   }

   const deleteList = async (list: ListInterface): Promise<any> => {
      if (!user) return
      const res = await deleteTiersList(user.token, { id: list._id })
      if (res.success) {
         const newLists = lists.filter((l) => l._id !== list._id)
         setLists(newLists)
         if (newLists.length === 0) {
            navigate('new')
         } else {
            navigate(toUrl(newLists[newLists.length - 1].name))
         }
      }
      return res
   }

   const editListName = async (listId: string, listName: string): Promise<any> => {
      if (!user) return
      const res = await updateTiersList(user.token, { id: listId, name: listName })
      if (res.success) {
         const newList = res.data
         setLists(lists.map((l) => (l._id === listId ? newList : l)))
         navigate(`${toUrl(listName)}/details`)
      }
      return res
   }

   const addPlayer = async (
      listId: string,
      playerName: string,
      players: PlayerInterface[]
   ): Promise<any> => {
      console.log(players)
      if (!user) return
      const newPlayers = [...players, { name: playerName, rates: [] }]
      const res = await updateTiersList(user.token, { id: listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         setLists(lists.map((l) => (l._id === listId ? newList : l)))
      }
      return res
   }

   const deletePlayer = async (
      listId: string,
      playerId: string,
      players: PlayerInterface[]
   ): Promise<any> => {
      if (!user) return
      const newPlayers = players.filter((p) => p._id !== playerId)
      const res = await updateTiersList(user.token, { id: listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         setLists(lists.map((l) => (l._id === listId ? newList : l)))
      }
      return res
   }

   const editPlayer = async (
      listId: string,
      playerId: string,
      playerName: string,
      players: PlayerInterface[]
   ): Promise<any> => {
      if (!user) return
      const newPlayers = players.map((p) =>
         p._id === playerId ? { name: playerName, rates: p.rates } : p
      )
      const res = await updateTiersList(user.token, { id: listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         setLists(lists.map((l) => (l._id === listId ? newList : l)))
      }
      return res
   }

   const addRate = async (
      listId: string,
      playerId: string,
      cardId: number,
      rate: string,
      players: PlayerInterface[]
   ): Promise<any> => {
      if (!user) return
      const newPlayers = players.map((p) => {
         if (p._id === playerId) {
            return { name: p.name, rates: [...p.rates, { cardId, value: rate }] }
         } else {
            return p
         }
      })
      const res = await updateTiersList(user.token, { id: listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         setLists(lists.map((l) => (l._id === listId ? newList : l)))
      }
      return res
   }

   const editRate = async (
      listId: string,
      playerId: string,
      cardId: number,
      newRate: string,
      players: PlayerInterface[]
   ): Promise<any> => {
      if (!user) return
      const newPlayers = players.map((p) => {
         if (p._id === playerId) {
            return {
               name: p.name,
               rates: newRate
                  ? p.rates.map((rate) =>
                       rate.cardId === cardId ? { cardId: rate.cardId, value: newRate } : rate
                    )
                  : p.rates.filter((r) => r.cardId !== cardId),
            }
         } else {
            return p
         }
      })
      const res = await updateTiersList(user.token, { id: listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         setLists(lists.map((l) => (l._id === listId ? newList : l)))
      }
      return res
   }

   return (
      <article>
         <section className="section justify-content-start">
            {user && (
               <>
                  {!isDetails && (
                     <header className="mt-5">
                        <p>
                           Welcome to the tiers list! Lorem ipsum dolor sit amet consectetur,
                           adipisicing elit. Harum amet mollitia quidem officiis cupiditate
                           obcaecati autem nam, eaque odio officia assumenda distinctio quae et ab,
                           accusantium optio id. Aspernatur, illo? Lorem ipsum dolor sit amet
                           consectetur adipisicing elit. Doloremque porro obcaecati labore nemo ut
                           tenetur asperiores minus soluta consequuntur, possimus dolores
                           repellendus, quisquam sed ipsam, adipisci ex itaque corporis. Enim.
                        </p>
                     </header>
                  )}
                  {isLoading ? (
                     <div>Loading...</div>
                  ) : (
                     <>
                        {lists.length === 0 ? (
                           // No tiers lists
                           <ListCreateSnap createList={createList} />
                        ) : (
                           // Tiers lists
                           <div className="d-flex w-100 h-100 mt-5">
                              {!isDetails && <ListLinks lists={lists} deleteList={deleteList} />}
                              <Routes>
                                 <Route
                                    index
                                    element={<ListCreateSnap createList={createList} />}
                                 />
                                 <Route
                                    path="/new"
                                    element={<ListCreateSnap createList={createList} />}
                                 />
                                 <Route
                                    path=":tierListName"
                                    element={<ListSnap lists={lists} deleteList={deleteList} />}
                                 />
                                 <Route
                                    path=":tierListName/details/*"
                                    element={
                                       <ListDetails
                                          lists={lists}
                                          editListName={editListName}
                                          addPlayer={addPlayer}
                                          deletePlayer={deletePlayer}
                                          editPlayer={editPlayer}
                                          addRate={addRate}
                                          editRate={editRate}
                                       />
                                    }
                                 />
                                 <Route path="*" element={<div>No such tiers list2.</div>} />
                              </Routes>
                           </div>
                        )}
                     </>
                  )}
               </>
            )}
         </section>
      </article>
   )
}
