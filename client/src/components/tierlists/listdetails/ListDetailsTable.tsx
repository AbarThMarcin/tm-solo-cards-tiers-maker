import { useEffect, useState } from 'react'
import { useModal } from '../../../context/ModalContext'
import { CARDS, CARD_TYPES } from '../../../data/cards'
import { ListInterface, PlayerInterface } from '../../../interfaces/listInterface'
import { getCards } from '../../../utils/arrays'
import { ListDetailsRate } from './ListDetailsRate'
import { AiTwotoneEdit, AiFillEye } from 'react-icons/ai'
import { FaExclamation } from 'react-icons/fa'
import { RiFilterFill, RiFilterOffFill } from 'react-icons/ri'
import { TiDelete, TiDeleteOutline } from 'react-icons/ti'
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi'
import { INPUT_TYPES } from '../../../interfaces/modalInterface'
import { CardInterface } from '../../../interfaces/cardInterface'
import { useUser } from '../../../context/UserContext'
import { updateTiersList } from '../../../api/apiTiersList'
import { useLists } from '../../../context/ListsContext'
import { ACTIONS_LISTS } from '../../../store/actions/actionsLists'
import Tippy from '@tippyjs/react'
import { Loading } from '../../../pages/Loading'

interface Props {
   list: ListInterface
   handleClickAddPlayer: () => void
}

const SORT_BY = {
   CARD_ID_ASC: 'CARD_ID_ASC',
   CARD_ID_DESC: 'CARD_ID_DESC',
   RATING_ASC: 'RATING_ASC',
   RATING_DESC: 'RATING_DESC',
}

export const ListDetailsTable: React.FC<Props> = ({ list, handleClickAddPlayer }) => {
   const { user } = useUser()
   const { dispatchLists } = useLists()
   const { setModal, setModalCardId } = useModal()
   const [filteredCardsIds, setFilteredCardsIds] = useState<number[]>(list.drawnCardsIds)
   const [filteredCardsDrawn, setFilteredCardsDrawn] = useState(getCards(CARDS, filteredCardsIds))
   const [loading, setLoading] = useState<boolean>(true)
   // Filter cards
   const [showFilter, setShowFilter] = useState(false)
   const [filterCard, setFilterCard] = useState<string>('')
   // Sort Cards
   const [sortBy, setSortBy] = useState(SORT_BY.RATING_DESC)

   useEffect(() => {
      filterCardsDrawn()
      setLoading(false)
   }, [filterCard, sortBy, list.drawnCardsIds])

   const filterCardsDrawn = (): void => {
      // Filter cards
      let newFilteredCards: CardInterface[] = getCards(CARDS, list.drawnCardsIds).filter((card) => {
         if (filterCard) {
            return (
               card.id.toString().includes(filterCard) ||
               card.name.toString().toUpperCase().includes(filterCard.toUpperCase()) ||
               card.description.toString().includes(filterCard.toUpperCase())
            )
         } else {
            return true
         }
      })
      // Sort cards
      switch (sortBy) {
         case SORT_BY.CARD_ID_ASC:
            newFilteredCards = sortedByCardId(newFilteredCards, SORT_BY.CARD_ID_ASC)
            break
         case SORT_BY.CARD_ID_DESC:
            newFilteredCards = sortedByCardId(newFilteredCards, SORT_BY.CARD_ID_DESC)
            break
         case SORT_BY.RATING_ASC:
            newFilteredCards = sortedByRating(newFilteredCards, SORT_BY.RATING_ASC)
            break
         case SORT_BY.RATING_DESC:
            newFilteredCards = sortedByRating(newFilteredCards, SORT_BY.RATING_DESC)
            break
         default:
            break
      }

      const newFilteredCardsIds = newFilteredCards.map((card) => card.id)
      setFilteredCardsDrawn(newFilteredCards)
      setFilteredCardsIds(newFilteredCardsIds)
   }

   const sortedByCardId = (cards: CardInterface[], sortBy: string): CardInterface[] => {
      const sortedCards = cards.sort((a, b) =>
         sortBy === SORT_BY.CARD_ID_ASC ? a.id - b.id : b.id - a.id
      )
      return sortedCards
   }

   const sortedByRating = (cards: CardInterface[], sortBy: string): CardInterface[] => {
      const cardsWithAvgRates = cards.map((card) => {
         return { ...card, avgRate: Number(getAvgRate(card.id)) }
      })
      const sortedCards = cardsWithAvgRates.sort((a, b) =>
         sortBy === SORT_BY.RATING_ASC ? a.avgRate - b.avgRate : b.avgRate - a.avgRate
      )
      return sortedCards
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

   const handleClickDeleteCard = (card: CardInterface): void => {
      setModal({
         show: true,
         showInpTxt: false,
         inputType: INPUT_TYPES.LIST,
         inputText: '',
         text: 'Are you sure you want to delete this card?\nThis action is irreversible!',
         onContinue: () => deleteCard(list._id, card.id, list.players),
      })
   }

   const handleClickShowCard = (cardId: number): void => {
      setModalCardId(cardId)
   }

   const deletePlayer = async (
      listId: string,
      playerId: string,
      players: PlayerInterface[]
   ): Promise<any> => {
      if (!user) return
      const newPlayers = players.filter((p) => p._id !== playerId)
      const res = await updateTiersList(user.token, { listId, players: newPlayers })
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
      const res = await updateTiersList(user.token, { listId, players: newPlayers })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
      }
      return res
   }

   const deleteCard = async (
      listId: string,
      cardId: number,
      players: PlayerInterface[]
   ): Promise<any> => {
      if (!user) return
      const newDrawnCardsIds = list.drawnCardsIds.filter((id) => id !== cardId)
      const newPlayers = players.map((p) => {
         return { ...p, rates: p.rates.filter((rate) => rate.cardId !== cardId) }
      })
      const res = await updateTiersList(user.token, {
         listId,
         drawnCardsIds: newDrawnCardsIds,
         players: newPlayers,
      })
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

   return loading ? (
      <Loading large={true} />
   ) : (
      <table>
         <thead>
            <tr>
               <th
                  className="pointer"
                  onClick={() =>
                     setSortBy(
                        sortBy === SORT_BY.CARD_ID_ASC ? SORT_BY.CARD_ID_DESC : SORT_BY.CARD_ID_ASC
                     )
                  }
               >
                  {sortBy === SORT_BY.CARD_ID_ASC && (
                     <HiOutlineArrowSmDown className="position-absolute sort-btn" size={20} />
                  )}
                  {sortBy === SORT_BY.CARD_ID_DESC && (
                     <HiOutlineArrowSmUp className="position-absolute sort-btn" size={20} />
                  )}
                  CARD
                  {showFilter ? (
                     <>
                        <RiFilterOffFill
                           className="pointer position-absolute filter-btn"
                           onClick={(e) => {
                              e.stopPropagation()
                              setShowFilter((prev) => {
                                 if (prev) setFilterCard('')
                                 return !prev
                              })
                           }}
                           size={16}
                        />
                        <div className="filter">
                           <input
                              type="text"
                              value={filterCard}
                              onChange={(e) => setFilterCard(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="SEARCH BY ID, NAME OR DESCRIPTION"
                           />
                           {filterCard && (
                              <TiDeleteOutline
                                 className="position-absolute pointer delete-filter"
                                 onClick={() => setFilterCard('')}
                                 size={30}
                              />
                           )}
                        </div>
                     </>
                  ) : (
                     <RiFilterFill
                        className="pointer position-absolute filter-btn"
                        onClick={(e) => {
                           e.stopPropagation()
                           setShowFilter((prev) => !prev)
                        }}
                        size={16}
                     />
                  )}
               </th>
               <th
                  className="pointer"
                  onClick={() =>
                     setSortBy(
                        sortBy === SORT_BY.RATING_DESC ? SORT_BY.RATING_ASC : SORT_BY.RATING_DESC
                     )
                  }
               >
                  {sortBy === SORT_BY.RATING_ASC && (
                     <HiOutlineArrowSmDown className="position-absolute sort-btn" size={20} />
                  )}
                  {sortBy === SORT_BY.RATING_DESC && (
                     <HiOutlineArrowSmUp className="position-absolute sort-btn" size={20} />
                  )}
                  RATING
               </th>
               {list.players.map((player, idx) => (
                  <th key={idx} className={isIncomplete(player) ? 'red' : ''}>
                     {isIncomplete(player) && (
                        <Tippy
                           content="One or more cards have not been rated by this player"
                           delay={[200, null]}
                        >
                           <div className="exclamation">
                              <FaExclamation className="full-size" />
                           </div>
                        </Tippy>
                     )}
                     <div style={{ marginRight: '25px' }}>{player.name}</div>
                     <AiTwotoneEdit
                        className="pointer position-absolute show-edit-delete second-icon"
                        onClick={() => handleClickEditPlayer(player._id, player.name)}
                        size={16}
                     />
                     <TiDelete
                        className="pointer position-absolute show-edit-delete"
                        onClick={() => handleClickDeletePlayer(player._id)}
                        size={16}
                     />
                  </th>
               ))}
               {list.players.length < 5 && (
                  <th className="pointer add-player" onClick={handleClickAddPlayer}>
                     * ADD PLAYER
                  </th>
               )}
            </tr>
         </thead>
         <tbody>
            {filteredCardsDrawn.length > 0 ? (
               filteredCardsDrawn.map((card, idx) => (
                  <tr key={idx}>
                     <td style={{ textAlign: 'left' }}>
                        {card.name} ({card.id})
                        <AiFillEye
                           className="pointer position-absolute show-edit-delete second-icon"
                           onClick={() => handleClickShowCard(card.id)}
                           size={16}
                        />
                        <TiDelete
                           className="pointer position-absolute show-edit-delete"
                           onClick={() => handleClickDeleteCard(card)}
                           size={16}
                        />
                        <div
                           className={
                              card.type === CARD_TYPES.GREEN
                                 ? 'green'
                                 : card.type === CARD_TYPES.BLUE
                                 ? 'blue'
                                 : 'red'
                           }
                        >{idx + 1}</div>
                     </td>
                     <td className="with-rate">{getAvgRate(card.id)}</td>
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
                     <td key={idx}>{getAvgRate(-1, player._id)}</td>
                  ))}
                  {list.players.length < 5 && <td></td>}
               </tr>
            </tfoot>
         )}
      </table>
   )
}
