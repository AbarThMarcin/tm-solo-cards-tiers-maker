import { useEffect, useState } from 'react'
import { useModal } from '../../../context/ModalContext'
import { CARDS, CARD_TYPES } from '../../../data/cards'
import { ListInterface, PlayerInterface } from '../../../interfaces/listInterface'
import { getCards } from '../../../utils/arrays'
import { ListDetailsRate } from './ListDetailsRate'
import { AiTwotoneEdit, AiFillEye } from 'react-icons/ai'
import { FaExclamation } from 'react-icons/fa'
import { RiFilterFill, RiFilterOffFill } from 'react-icons/ri'
import { TiDelete } from 'react-icons/ti'
import { FcClearFilters } from 'react-icons/fc'
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
   const [showFilterCard, setShowFilterCard] = useState<boolean>(false)
   const [showFilterRate, setShowFilterRate] = useState<boolean[]>([
      false,
      false,
      false,
      false,
      false,
   ])
   const [filterCard, setFilterCard] = useState<string>('')
   const [filterRate, setFilterRate] = useState<string[]>(['', '', '', '', ''])
   // Sort Cards
   const [sortBy, setSortBy] = useState(SORT_BY.RATING_DESC)

   useEffect(() => {
      filterCardsDrawn()
      setLoading(false)
   }, [filterCard, filterRate, sortBy, list.drawnCardsIds])

   const filterCardsDrawn = (): void => {
      // Filter cards by Id, Name or Description
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
      // Filter Cards by Players' rates
      list.players.forEach((_, idx) => {
         if (filterRate[idx]) {
            const playerId = list.players[idx]._id
            newFilteredCards = newFilteredCards.filter((card) => {
               const rate = getRate(card.id, playerId)
               if (
                  rate?.toUpperCase() === filterRate[idx] ||
                  (rate === undefined && filterRate[idx] === 'X')
               )
                  return true
            })
         }
      })
      // Sort cards by Card Id or Rating
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
      // Sort cards by player's rate
      if (sortBy.slice(0, 1).toUpperCase() === 'P')
         newFilteredCards = sortedByPlayerRate(newFilteredCards)

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

   const sortedByPlayerRate = (cards: CardInterface[]): CardInterface[] => {
      const playerIndex: number = parseInt(sortBy.slice(1, 2))
      const cardsWithRates = cards.map((card) => {
         return { ...card, rate: numRate(getRate(card.id, list.players[playerIndex]._id) || 'X') }
      })
      const sorted = cardsWithRates.sort((a, b) =>
         sortBy.slice(3) === 'ASC' ? b.rate - a.rate : a.rate - b.rate
      )

      return cardsWithRates
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

   const handleInputFilterRate = (e: React.ChangeEvent<HTMLInputElement>, idx: number): void => {
      const lastChar = e.target.value.slice(-1).toUpperCase()
      if ('SABCDEFX'.includes(lastChar)) {
         let newFilterRate = [...filterRate]
         newFilterRate[idx] = lastChar
         setFilterRate(newFilterRate)
      }
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

   const getRate = (cardId: number, playerId: string): string | undefined => {
      let foundRate: string | undefined
      foundRate = undefined
      list.players.forEach((player) => {
         player.rates.forEach((rate) => {
            if (player._id === playerId && rate.cardId === cardId) {
               foundRate = rate.value
            }
         })
      })
      return foundRate
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
            return sortBy.slice(3) === 'ASC' ? -1 : 999
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
                  {/* Sort arrows */}
                  {sortBy === SORT_BY.CARD_ID_ASC && (
                     <HiOutlineArrowSmUp className="position-absolute sort-btn" size={20} />
                  )}
                  {sortBy === SORT_BY.CARD_ID_DESC && (
                     <HiOutlineArrowSmDown className="position-absolute sort-btn" size={20} />
                  )}
                  <span className="d-flex justify-content-center align-items-center position-relative ms-auto me-auto">
                     {/* Filter Buttons */}
                     {showFilterCard ? (
                        <RiFilterOffFill
                           className="filter-btn pointer"
                           onClick={(e) => {
                              e.stopPropagation()
                              setShowFilterCard((prev) => {
                                 if (prev) setFilterCard('')
                                 return !prev
                              })
                           }}
                           size={16}
                        />
                     ) : (
                        <RiFilterFill
                           className="filter-btn pointer"
                           onClick={(e) => {
                              e.stopPropagation()
                              setShowFilterCard((prev) => !prev)
                           }}
                           size={16}
                        />
                     )}
                     {filterCard !== '' && (
                        <FcClearFilters
                           className="filter-btn clear pointer"
                           onClick={(e) => {
                              e.stopPropagation()
                              setFilterCard('')
                              setShowFilterCard(false)
                           }}
                           size={15}
                        />
                     )}
                     {/* Header */}
                     <span>CARD</span>
                  </span>
                  {/* Filter Input */}
                  {showFilterCard && (
                     <input
                        type="text"
                        value={filterCard}
                        onChange={(e) => setFilterCard(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="SEARCH BY ID, NAME OR DESCRIPTION"
                        onBlur={() => setShowFilterCard(false)}
                        autoFocus
                        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => e.target.select()}
                     />
                  )}
                  {/* Card Counter */}
                  <div className="card-count">{filteredCardsIds.length}</div>
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
                     <HiOutlineArrowSmUp className="position-absolute sort-btn" size={20} />
                  )}
                  {sortBy === SORT_BY.RATING_DESC && (
                     <HiOutlineArrowSmDown className="position-absolute sort-btn" size={20} />
                  )}
                  RATING
               </th>
               {list.players.map((player, idx) => (
                  <th
                     key={idx}
                     className={isIncomplete(player) ? 'red pointer' : 'pointer'}
                     onClick={() => {
                        let newSortBy = ''
                        if (sortBy.slice(0, 1).toUpperCase() === 'P' && sortBy === `P${idx}_ASC`) {
                           newSortBy = `P${idx}_DESC`
                        } else {
                           newSortBy = `P${idx}_ASC`
                        }

                        setSortBy(newSortBy)
                     }}
                  >
                     {/* Sort arrows */}
                     {parseInt(sortBy.slice(1, 2)) === idx && sortBy.slice(3, 7) === 'DESC' && (
                        <HiOutlineArrowSmUp className="position-absolute sort-btn" size={20} />
                     )}
                     {parseInt(sortBy.slice(1, 2)) === idx && sortBy.slice(3, 6) === 'ASC' && (
                        <HiOutlineArrowSmDown className="position-absolute sort-btn" size={20} />
                     )}
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
                     <div style={{ marginRight: '25px' }}>
                        {/* Player Name */}
                        <span className="d-flex align-items-center position-relative ms-auto me-auto">
                           {/* Filter Buttons */}
                           {showFilterRate[idx] ? (
                              <RiFilterOffFill
                                 className="filter-btn pointer"
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    let newShowFilterRate = [...showFilterRate]
                                    newShowFilterRate[idx] = !newShowFilterRate[idx]
                                    setShowFilterRate(newShowFilterRate)
                                 }}
                                 size={16}
                              />
                           ) : (
                              <RiFilterFill
                                 className="filter-btn pointer"
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    let newShowFilterRate = [...showFilterRate]
                                    newShowFilterRate[idx] = !newShowFilterRate[idx]
                                    setShowFilterRate(newShowFilterRate)
                                 }}
                                 size={16}
                              />
                           )}
                           {filterRate[idx] !== '' && (
                              <FcClearFilters
                                 className="filter-btn clear pointer"
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    let newShowFilterRate = [...showFilterRate]
                                    newShowFilterRate[idx] = false
                                    setShowFilterRate(newShowFilterRate)
                                    let newFilterRate = [...filterRate]
                                    newFilterRate[idx] = ''
                                    setFilterRate(newFilterRate)
                                 }}
                                 size={15}
                              />
                           )}
                           {player.name}
                        </span>
                     </div>
                     {/* Filter Input */}
                     {showFilterRate[idx] && (
                        <Tippy content="Type 'X' to filter cards with no rate" delay={[200, null]}>
                           <input
                              type="text"
                              value={filterRate[idx]}
                              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                 handleInputFilterRate(e, idx)
                              }
                              onClick={(e) => e.stopPropagation()}
                              placeholder="SEARCH BY RATE"
                              onBlur={() => {
                                 let newShowFilterRate = [...showFilterRate]
                                 newShowFilterRate[idx] = false
                                 setShowFilterRate(newShowFilterRate)
                              }}
                              autoFocus
                              onFocus={(e: React.ChangeEvent<HTMLInputElement>) =>
                                 e.target.select()
                              }
                           />
                        </Tippy>
                     )}

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
                        >
                           {idx + 1}
                        </div>
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
