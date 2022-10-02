import { useEffect, useMemo, useState } from 'react'
import { useModal } from '../../../context/ModalContext'
import { CARDS } from '../../../data/cards'
import { ListInterface, PlayerInterface } from '../../../interfaces/listInterface'
import { getCards } from '../../../utils/arrays'
import { ListDetailsRate } from './ListDetailsRate'
import { AiTwotoneEdit } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'
import { INPUT_TYPES } from '../../../interfaces/modalInterface'
import { CardInterface } from '../../../interfaces/cardInterface'
import { useUser } from '../../../context/UserContext'
import { updateTiersList } from '../../../api/apiTiersList'
import { useLists } from '../../../context/ListsContext'
import { ACTIONS_LISTS } from '../../../store/actions/actionsLists'

interface Props {
   list: ListInterface
   handleClickAddPlayer: () => void
}

export const ListDetailsTable: React.FC<Props> = ({ list, handleClickAddPlayer }) => {
   const { user } = useUser()
   const { dispatchLists } = useLists()
   const { setModal } = useModal()
   const [filteredCardsIds, setFilteredCardsIds] = useState<number[]>(list.drawnCardsIds)
   const filteredCardsDrawn = useMemo(() => getCards(CARDS, filteredCardsIds), [filteredCardsIds])
   // Filter by card
   const [filterCard, setFilterCard] = useState<string>('')

   useEffect(() => {
      setFilteredCardsIds(list.drawnCardsIds)
   }, [list.drawnCardsIds])

   useEffect(() => {
      filterCardsDrawn()
   }, [filterCard])

   const filterCardsDrawn = (): void => {
      const newFilteredCards: CardInterface[] = getCards(CARDS, list.drawnCardsIds).filter(
         (card) => {
            if (filterCard) {
               return (
                  card.id.toString().includes(filterCard) ||
                  card.name.toString().toUpperCase().includes(filterCard.toUpperCase()) ||
                  card.description.toString().includes(filterCard.toUpperCase())
               )
            } else {
               return true
            }
         }
      )
      const newFilteredCardsIds = newFilteredCards.map((card) => card.id)
      setFilteredCardsIds(newFilteredCardsIds)
   }

   const handleClickDeletePlayer = (playerId: string): void => {
      setModal({
         show: true,
         showInpTxt: false,
         inputType: INPUT_TYPES.PLAYER,
         inputText: '',
         text: 'Are you sure you want to delete this player?\nThis action is irreversible!',
         onContinue: () => deletePlayer(list._id, playerId, list.players),
      })
   }
   const handleClickEditPlayer = (playerId: string, playerName: string): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.PLAYER,
         inputText: playerName,
         text: "Enter player's new name:",
         onContinue: (playerName) => editPlayer(list._id, playerId, playerName, list.players),
      })
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
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
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
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
      }
      return res
   }

   const isIncomplete = (player: PlayerInterface): boolean => {
      return player.rates.length < filteredCardsDrawn.length
   }

   const getAvgRate = (cardId: number = -1, playerId: string = ''): number | string => {
      let cardRates: string[] = []
      list.players.forEach((player) => {
         player.rates.forEach((rate) => {
            if (cardId === -1) {
               if (!playerId) {
                  if (filteredCardsIds.includes(rate.cardId)) cardRates.push(rate.value)
               } else {
                  if (player._id === playerId && filteredCardsIds.includes(rate.cardId))
                     cardRates.push(rate.value)
               }
            } else {
               if (!playerId) {
                  if (rate.cardId === cardId && filteredCardsIds.includes(rate.cardId))
                     cardRates.push(rate.value)
               } else {
                  if (
                     player._id === playerId &&
                     rate.cardId === cardId &&
                     filteredCardsIds.includes(rate.cardId)
                  )
                     cardRates.push(rate.value)
               }
            }
         })
      })
      const avgRate: number =
         cardRates.reduce((total, rate) => {
            const numericRate = numRate(rate)
            return total + numericRate
         }, 0) / cardRates.length

      return cardRates.length ? avgRate.toFixed(2) : '-'
   }

   const numRate = (rate: string): number => {
      switch (rate) {
         case 'S':
            return 6
         case 'A':
            return 5
         case 'B':
            return 4
         case 'C':
            return 3
         case 'D':
            return 2
         case 'E':
            return 1
         case 'F':
            return 0
         default:
            return 0
      }
   }

   return (
      <table>
         <thead>
            <tr>
               <th className="position-relative">
                  CARD
                  <input
                     type="text"
                     value={filterCard}
                     onChange={(e) => setFilterCard(e.target.value)}
                     placeholder="SEARCH BY ID, NAME OR DESCRIPTION"
                  />
                  {filterCard && (
                     <div
                        className="position-absolute pointer"
                        style={{
                           fontSize: '20px',
                           color: '#000',
                           right: 0,
                           top: '50%',
                           translate: '0 -50%',
                        }}
                        onClick={() => {
                           setFilterCard('')
                        }}
                     >
                        *
                     </div>
                  )}
               </th>
               <th>RATING</th>
               {list.players.map((player, idx) => (
                  <th key={idx} className={isIncomplete(player) ? 'bg-dark' : ''}>
                     {player.name}
                     <AiTwotoneEdit
                        className="pointer"
                        onClick={() => handleClickEditPlayer(player._id, player.name)}
                     />
                     <TiDelete
                        className="pointer"
                        onClick={() => handleClickDeletePlayer(player._id)}
                     />
                  </th>
               ))}
               {list.players.length < 5 && (
                  <th className="pointer" onClick={handleClickAddPlayer}>
                     * ADD PLAYER
                  </th>
               )}
            </tr>
         </thead>
         <tbody>
            {filteredCardsDrawn.length > 0 ? (
               filteredCardsDrawn.map((card, idx) => (
                  <tr key={idx}>
                     <td>{card.id}</td>
                     <td>{getAvgRate(card.id)}</td>
                     {list.players.map((player, idx) => (
                        <ListDetailsRate
                           key={idx}
                           list={list}
                           player={player}
                           card={card}
                           isIncomplete={isIncomplete}
                        />
                     ))}
                     {list.players.length < 5 && <td></td>}
                  </tr>
               ))
            ) : (
               <tr>
                  <td colSpan={3 + list.players.length}>No cards have been drawn yet</td>
               </tr>
            )}
         </tbody>
         {filteredCardsDrawn.length > 0 && (
            <tfoot>
               <tr>
                  <td>AVERAGE</td>
                  <td>{getAvgRate()}</td>
                  {list.players.map((player, idx) => (
                     <td key={idx} className={isIncomplete(player) ? 'bg-dark' : ''}>
                        {getAvgRate(-1, player._id)}
                     </td>
                  ))}
                  {list.players.length < 5 && <td></td>}
               </tr>
            </tfoot>
         )}
      </table>
   )
}
