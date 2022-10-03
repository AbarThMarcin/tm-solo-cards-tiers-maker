import React, { useState } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTiersList } from '../../api/apiTiersList'
import { ListDetailsTable } from '../../components/tierlists/listdetails/ListDetailsTable'
import { NoTiersList } from '../../components/tierlists/NoTiersList'
import { useLists } from '../../context/ListsContext'
import { useModal } from '../../context/ModalContext'
import { useUser } from '../../context/UserContext'
import { PlayerInterface } from '../../interfaces/listInterface'
import { INPUT_TYPES } from '../../interfaces/modalInterface'
import { ACTIONS_LISTS } from '../../store/actions/actionsLists'
import { toUrl } from '../../utils/strings'

export const ListDetails: React.FC = () => {
   const navigate = useNavigate()
   const { listName } = useParams()
   const { user } = useUser()
   const { stateLists, dispatchLists } = useLists()
   const { setModal } = useModal()
   const list = stateLists.find((l) => toUrl(l.name) === listName)
   const [editNameMode, setEditNameMode] = useState(false)

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
   const handleClickEditListName = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.LIST,
         inputText: list?.name || '',
         text: "Enter list's new name:",
         onContinue: async (name) => {
            const res = await editListName(list?._id || '', name)
            if (res.success) navigate(toUrl(`/lists/${name}`))
            return res
         },
      })
   }

   const addPlayer = async (
      listId: string,
      playerName: string,
      players: PlayerInterface[]
   ): Promise<any> => {
      if (!user) return
      const newPlayers = [...players, { name: playerName, rates: [] }]
      const res = await updateTiersList(user.token, { listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
      }
      return res
   }
   const editListName = async (listId: string, listName: string): Promise<any> => {
      if (!user) return
      const res = await updateTiersList(user.token, { listId, name: listName })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
      }
      return res
   }

   const handleClickGoBack = (): void => {
      navigate('/lists')
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
               {/* Table with buttons */}
               <ListDetailsTable list={list} handleClickAddPlayer={handleClickAddPlayer} />
               {list.drawnCardsIds.length < 208 && (
                  <button onClick={() => navigate('new-rate')}>RATE NEW CARD</button>
               )}
               {list.players.length < 5 && (
                  <button onClick={handleClickAddPlayer}>ADD NEW PLAYER</button>
               )}
            </>
         ) : (
            <NoTiersList />
         )}
      </div>
   )
}
