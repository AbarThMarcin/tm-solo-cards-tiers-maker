import React from 'react'
import { CardInterface } from '../../../interfaces/cardInterface'
import { ListInterface, PlayerInterface } from '../../../interfaces/listInterface'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useModal } from '../../../context/ModalContext'
import { INPUT_TYPES } from '../../../interfaces/modalInterface'
import { useUser } from '../../../context/UserContext'
import { updateTiersList } from '../../../api/apiTiersList'
import { ACTIONS_LISTS } from '../../../store/actions/actionsLists'
import { useLists } from '../../../context/ListsContext'

interface Props {
   list: ListInterface
   player: PlayerInterface
   card: CardInterface
   isIncomplete: (player: PlayerInterface) => boolean
}

export const ListDetailsRate: React.FC<Props> = ({ list, player, card, isIncomplete }) => {
   const { user } = useUser()
   const { dispatchLists } = useLists()
   const { setModal } = useModal()
   const rate = list.players
      .find((pl) => pl.name === player.name)
      ?.rates.find((r) => r.cardId === card.id)?.value

   const handleClickAddRate = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.ADD_RATE,
         inputText: '',
         text: 'Enter new rate:',
         onContinue: (val) => addRate(list._id, player._id, card.id, val, list.players),
      })
   }

   const handleClickEditRate = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.EDIT_RATE,
         inputText: rate || '',
         text: 'Edit rate (put empty string to delete the rate):',
         onContinue: (newValue) => editRate(list._id, player._id, card.id, newValue, list.players),
      })
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
      const res = await updateTiersList(user.token, { listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
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
      const res = await updateTiersList(user.token, { listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
      }
      return res
   }

   return (
      <td className={isIncomplete(player) ? 'bg-dark' : ''}>
         {rate ? (
            <>
               {rate}
               <AiTwotoneEdit className="pointer" onClick={handleClickEditRate} />
            </>
         ) : (
            <div className="pointer" onClick={handleClickAddRate}>
               * ADD RATE
            </div>
         )}
      </td>
   )
}
