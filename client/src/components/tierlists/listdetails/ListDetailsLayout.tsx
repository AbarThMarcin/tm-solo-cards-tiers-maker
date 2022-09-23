import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ListInterface, PlayerInterface } from '../../../interfaces/listInterface'
import { toUrl } from '../../../utils/strings'
import { NoTiersList } from '../NoTiersList'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { AiTwotoneEdit } from 'react-icons/ai'
import { ListDetailsTable } from './listdetailstable/ListDetailsTable'
import { useState } from 'react'
import { useModal } from '../../../context/ModalContext'
import { INPUT_TYPES } from '../../../interfaces/modalInterface'
import { ListNewRate } from './ListNewRate'

interface Props {
   lists: ListInterface[]
   editListName: (listId: string, listName: string) => Promise<void>
   addPlayer: (listId: string, playerName: string, players: PlayerInterface[]) => Promise<void>
   deletePlayer: (listId: string, playerId: string, players: PlayerInterface[]) => Promise<void>
   editPlayer: (
      listId: string,
      playerId: string,
      playerName: string,
      players: PlayerInterface[]
   ) => Promise<void>
   addRate: (
      listId: string,
      playerId: string,
      cardId: number,
      rate: string,
      players: PlayerInterface[]
   ) => Promise<void>
   editRate: (
      listId: string,
      playerId: string,
      cardId: number,
      newRate: string,
      players: PlayerInterface[]
   ) => Promise<void>
}

export const ListDetails: React.FC<Props> = ({
   lists,
   editListName,
   addPlayer,
   deletePlayer,
   editPlayer,
   addRate,
   editRate,
}) => {
   const navigate = useNavigate()
   const { pathname } = useLocation()
   const { setModal } = useModal()
   const { tierListName } = useParams()
   // const list = lists.find((l) => toUrl(l.name) === tierListName)
   const list = lists[0]
   const [editNameMode, setEditNameMode] = useState(false)

   const handleClickEditListName = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.LIST,
         inputText: list?.name || '',
         text: "Enter list's new name:",
         onContinue: (name) => editListName(list?._id || '', name),
      })
   }

   const handleClickAddPlayer = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.PLAYER,
         inputText: '',
         text: "Enter new player's name:",
         onContinue: (playerName) => addPlayer(list?._id || '', playerName, list?.players || []),
      })
   }

   const handleClickGoBack = (): void => {
      navigate(pathname.replace('details', ''))
   }

   return (
      <div className="w-100">
         {list ? (
            <>
               {/* Go Back Button */}
               <RiArrowGoBackFill className="pointer" onClick={handleClickGoBack} />
               {/* Tiers List Name */}
               <h1
                  className="text-center ms-auto me-auto pointer ps-5 pe-5 position-relative"
                  style={{ width: 'max-content' }}
                  onMouseEnter={() => setEditNameMode(true)}
                  onMouseLeave={() => setEditNameMode(false)}
               >
                  {list?.name}
                  {editNameMode && (
                     <div
                        className="position-absolute h-100 d-flex justify-content-center align-items-center"
                        style={{ aspectRatio: '1', right: '0', top: '0' }}
                        onClick={handleClickEditListName}
                     >
                        <AiTwotoneEdit className="w-75 h-75" />
                     </div>
                  )}
               </h1>

               <Routes>
                  <Route
                     index
                     element={
                        <>
                           <ListDetailsTable
                              list={list}
                              deletePlayer={deletePlayer}
                              editPlayer={editPlayer}
                              addRate={addRate}
                              editRate={editRate}
                              handleClickAddPlayer={handleClickAddPlayer}
                           />
                           {list.drawnCardsIds.length < 208 && <button>RATE NEW CARD</button>}
                           {list.players.length < 5 && (
                              <button onClick={handleClickAddPlayer}>ADD NEW PLAYER</button>
                           )}
                        </>
                     }
                  />
                  <Route path="new-rate" element={<ListNewRate />} />
                  <Route path="*" element={<div>No such tiers list2.</div>} />
               </Routes>
            </>
         ) : (
            <NoTiersList />
         )}
      </div>
   )
}
