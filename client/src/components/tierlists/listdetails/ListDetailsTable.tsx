import { useEffect, useState } from 'react'
import { useModal } from '../../../context/ModalContext'
import { CARDS, CARD_TYPES } from '../../../data/cards'
import { ListInterface, OptionsInterface, PlayerInterface } from '../../../interfaces/listInterface'
import { getCards, matchesAnd, matchesOr } from '../../../utils/arrays'
import { deepEqual } from '../../../utils/objects'
import { ListDetailsRate } from './ListDetailsRate'
import { AiTwotoneEdit, AiFillEye, AiOutlineBarChart } from 'react-icons/ai'
import { FaExclamation } from 'react-icons/fa'
import { RiFilterFill, RiFilterOffFill } from 'react-icons/ri'
import { TiDelete } from 'react-icons/ti'
import { FcClearFilters } from 'react-icons/fc'
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi'
import { BiExport } from 'react-icons/bi'
import { BsFilterRight } from 'react-icons/bs'
import { GoListOrdered } from 'react-icons/go'
import { TbFilterOff } from 'react-icons/tb'
import { ImFilter } from 'react-icons/im'
import { INPUT_TYPES } from '../../../interfaces/modalInterface'
import { CardInterface } from '../../../interfaces/cardInterface'
import { useUser } from '../../../context/UserContext'
import { updateTiersList } from '../../../api/apiTiersList'
import { useLists } from '../../../context/ListsContext'
import { ACTIONS_LISTS } from '../../../store/actions/actionsLists'
import Tippy from '@tippyjs/react'
import { Loading } from '../../../pages/Loading'
import { CSVLink } from 'react-csv'
import { FiltersSection } from '../../filterslist/FiltersSection'
import {
   useFilters,
   initFilters,
   AND_OR,
   COST_TYPES,
   NEG_ALL_POS,
} from '../../../context/FiltersContext'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import { FiltersStateInt } from '../../../interfaces/filtersInterface'

interface Props {
   list: ListInterface
   handleClickAddPlayer: () => void
}

const SORT_BY = {
   ADD_TIME_ASC: 'ADD_TIME_ASC',
   ADD_TIME_DESC: 'ADD_TIME_DESC',
   CARD_ID_ASC: 'CARD_ID_ASC',
   CARD_ID_DESC: 'CARD_ID_DESC',
   RATING_ASC: 'RATING_ASC',
   RATING_DESC: 'RATING_DESC',
}

export const ListDetailsTable: React.FC<Props> = ({ list, handleClickAddPlayer }) => {
   const { user } = useUser()
   const { dispatchLists } = useLists()
   const { setModal, setModalCardId, setModalCharts } = useModal()
   const [filteredCardsDrawn, setFilteredCardsDrawn] = useState(getCards(CARDS, list.drawnCardsIds))
   const [loading, setLoading] = useState<boolean>(true)
   const [orderedFocus, setOrderedFocus] = useState(list.options.orderedFocus)
   const lastId: number = list.drawnCardsIds[list.drawnCardsIds.length - 1] || -1
   // Filter cards
   const [showFilterCard, setShowFilterCard] = useState<boolean>(false)
   const [showFilterAvgRate, setShowFilterAvgRate] = useState<boolean>(false)
   const [showFilterRate, setShowFilterRate] = useState<boolean[]>(new Array(5).fill(false))
   const [showAdvFilter, setShowAdvFilter] = useState<boolean>(false)
   const [filterCard, setFilterCard] = useState<string>('')
   const [filterAvgRate, setFilterAvgRate] = useState<string>('')
   const [filterRate, setFilterRate] = useState<string[]>(['', '', '', '', ''])
   const { stateFilters, dispatchFilters } = useFilters()
   const [selectedIds, setSelectedIds] = useState<number[]>([])
   const [manualIds, setManualIds] = useState<number[]>([])
   // Sort Cards
   const [sortBy, setSortBy] = useState(list.options.sortBy)

   useEffect(() => {
      filterCardsDrawn()
      setLoading(false)
   }, [filterCard, filterAvgRate, filterRate, sortBy, stateFilters, manualIds, list.drawnCardsIds])

   const filterCardsDrawn = (): void => {
      let newFilteredCards: CardInterface[] = getCards(CARDS, list.drawnCardsIds)

      // Filter cards by Id, Name or Description
      if (filterCard) {
         newFilteredCards = newFilteredCards.filter((card) => {
            return (
               card.id.toString().includes(filterCard) ||
               card.name.toString().toUpperCase().includes(filterCard.toUpperCase()) ||
               card.description.toString().includes(filterCard.toUpperCase())
            )
         })
      } else if (!deepEqual(stateFilters, initFilters)) {
         newFilteredCards = getFilteredTags(newFilteredCards, stateFilters)
         newFilteredCards = getFilteredCardType(newFilteredCards, stateFilters)
         newFilteredCards = getFilteredCost(newFilteredCards, stateFilters)
         newFilteredCards = getFilteredSearch(newFilteredCards, stateFilters)
         newFilteredCards = getFilteredProduction(newFilteredCards, stateFilters)
         newFilteredCards = getFilteredVP(newFilteredCards, stateFilters)
         newFilteredCards = getFilteredRequirements(newFilteredCards, stateFilters)
         newFilteredCards = getFilteredParameters(newFilteredCards, stateFilters)
         newFilteredCards = getFilteredCanHaveUnits(newFilteredCards, stateFilters)
      }

      // Filter Cards by Avg Rate
      if (filterAvgRate) {
         newFilteredCards = newFilteredCards.filter((card) => {
            if (!isNaN(Number(filterAvgRate))) {
               return (
                  Number(
                     getAvgRate(
                        card.id,
                        '',
                        newFilteredCards.map((c) => c.id)
                     )
                  ) === Number(filterAvgRate)
               )
            } else if (
               !isNaN(Number(filterAvgRate.slice(1))) &&
               filterAvgRate.slice(0, 1) === '>'
            ) {
               return (
                  Number(
                     getAvgRate(
                        card.id,
                        '',
                        newFilteredCards.map((c) => c.id)
                     )
                  ) > Number(filterAvgRate.slice(1))
               )
            } else if (
               !isNaN(Number(filterAvgRate.slice(1))) &&
               filterAvgRate.slice(0, 1) === '<'
            ) {
               return (
                  Number(
                     getAvgRate(
                        card.id,
                        '',
                        newFilteredCards.map((c) => c.id)
                     )
                  ) < Number(filterAvgRate.slice(1))
               )
            } else if (
               !isNaN(Number(filterAvgRate.slice(2))) &&
               filterAvgRate.slice(0, 2) === '>='
            ) {
               return (
                  Number(
                     getAvgRate(
                        card.id,
                        '',
                        newFilteredCards.map((c) => c.id)
                     )
                  ) >= Number(filterAvgRate.slice(2))
               )
            } else if (
               !isNaN(Number(filterAvgRate.slice(2))) &&
               filterAvgRate.slice(0, 2) === '<='
            ) {
               return (
                  Number(
                     getAvgRate(
                        card.id,
                        '',
                        newFilteredCards.map((c) => c.id)
                     )
                  ) <= Number(filterAvgRate.slice(2))
               )
            }
         })
      }
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
         case SORT_BY.ADD_TIME_ASC:
            newFilteredCards = sortedByAddTime(newFilteredCards, SORT_BY.ADD_TIME_ASC)
            break
         case SORT_BY.ADD_TIME_DESC:
            newFilteredCards = sortedByAddTime(newFilteredCards, SORT_BY.ADD_TIME_DESC)
            break
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

      // Filter by manually selected cards
      if (manualIds.length > 0) {
         newFilteredCards = sortedManually(newFilteredCards)
      }

      setFilteredCardsDrawn(newFilteredCards)
   }

   function getFilteredTags(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.tags.length > 0) {
         filtered =
            stateFilters.tagsAndOr === AND_OR.AND
               ? filtered.filter((card) => matchesAnd(card.tags, stateFilters.tags))
               : filtered.filter((card) => matchesOr(card.tags, stateFilters.tags))
      }
      return filtered
   }
   function getFilteredCardType(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.cardTypes.length > 0) {
         filtered = filtered.filter((card) => stateFilters.cardTypes.includes(card.type))
      }
      return filtered
   }
   function getFilteredCost(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      switch (stateFilters.costMinMaxEqual) {
         case COST_TYPES.MIN:
            filtered = filtered.filter((card) => card.cost >= stateFilters.cost)
            break
         case COST_TYPES.EQUAL:
            filtered = filtered.filter((card) => card.cost == stateFilters.cost)
            break
         case COST_TYPES.MAX:
            filtered = filtered.filter((card) => card.cost <= stateFilters.cost)
            break
         default:
            break
      }
      return filtered
   }
   function getFilteredSearch(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      const v = stateFilters.searchValue.toUpperCase()
      if (v !== '') {
         filtered = filtered.filter(
            (card) =>
               card.id.toString().toUpperCase().includes(v) ||
               card.name.toUpperCase().includes(v) ||
               card.description.toUpperCase().includes(v)
         )
      }
      return filtered
   }
   function getFilteredProduction(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.production.length > 0) {
         filtered =
            stateFilters.productionAndOr === AND_OR.AND
               ? filtered.filter((card) => matchesAnd(card.production, stateFilters.production))
               : filtered.filter((card) => matchesOr(card.production, stateFilters.production))
      }
      return filtered
   }
   function getFilteredVP(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.vp !== null) {
         if (stateFilters.vp) {
            filtered =
               stateFilters.vpNegPosAll === NEG_ALL_POS.NEGATIVE
                  ? filtered.filter((card) => card.vp < 0)
                  : stateFilters.vpNegPosAll === NEG_ALL_POS.POSITIVE
                  ? filtered.filter((card) => card.iconNames.vp !== null && card.vp >= 0)
                  : filtered.filter((card) => card.iconNames.vp !== null)
         } else {
            filtered = filtered.filter((card) => card.iconNames.vp === null)
         }
      }
      return filtered
   }
   function getFilteredRequirements(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.requirements.length > 0) {
         filtered =
            stateFilters.requirementsAndOr === AND_OR.AND
               ? filtered.filter((card) =>
                    matchesAnd(
                       card.requirements.map((req) => req.type),
                       stateFilters.requirements
                    )
                 )
               : filtered.filter((card) =>
                    matchesOr(
                       card.requirements.map((req) => req.type),
                       stateFilters.requirements
                    )
                 )
      }
      return filtered
   }
   function getFilteredParameters(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.parameters.length > 0) {
         filtered =
            stateFilters.parametersAndOr === AND_OR.AND
               ? filtered.filter((card) => matchesAnd(card.parameters, stateFilters.parameters))
               : filtered.filter((card) => matchesOr(card.parameters, stateFilters.parameters))
      }
      return filtered
   }
   function getFilteredCanHaveUnits(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.canHaveUnits.length > 0) {
         filtered = filtered.filter((card) =>
            stateFilters.canHaveUnits.includes(card.canHaveUnits || '')
         )
      }
      return filtered
   }

   const sortedByAddTime = (cards: CardInterface[], sortBy: string): CardInterface[] => {
      const cardsIds = cards.map((c) => c.id)
      const sortedCards = getCards(CARDS, list.drawnCardsIds).filter((c) => cardsIds.includes(c.id))
      if (sortBy === SORT_BY.ADD_TIME_DESC) sortedCards.reverse()
      return sortedCards
   }

   const sortedByCardId = (cards: CardInterface[], sortBy: string): CardInterface[] => {
      const sortedCards = cards.sort((a, b) =>
         sortBy === SORT_BY.CARD_ID_ASC ? a.id - b.id : b.id - a.id
      )
      return sortedCards
   }

   const sortedByRating = (cards: CardInterface[], sortBy: string): CardInterface[] => {
      const cardsWithAvgRates = cards.map((card) => {
         return {
            ...card,
            avgRate: Number(
               getAvgRate(
                  card.id,
                  '',
                  cards.map((c) => c.id)
               )
            ),
         }
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

   const sortedManually = (cards: CardInterface[]): CardInterface[] => {
      return cards.filter(card => manualIds.includes(card.id))
   }

   const handleClickDeletePlayer = (playerId: string): void => {
      setModal({
         show: true,
         showInpTxt: false,
         inputType: INPUT_TYPES.PLAYER,
         inputText: '',
         text: 'Are you sure you want to delete this player?\nThis action is irreversible!',
         onContinue: () => deletePlayer(playerId, list.players),
      })
   }
   const handleClickEditPlayer = (playerId: string, playerName: string): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.PLAYER,
         inputText: playerName,
         text: "Enter player's new name:",
         onContinue: (playerName) => editPlayer(playerId, playerName, list.players),
      })
   }

   const handleClickDeleteCard = (card: CardInterface): void => {
      setModal({
         show: true,
         showInpTxt: false,
         inputType: INPUT_TYPES.LIST,
         inputText: '',
         text: 'Are you sure you want to delete this card?\nThis action is irreversible!',
         onContinue: () => deleteCard(card.id, list.players),
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

   const deletePlayer = async (playerId: string, players: PlayerInterface[]): Promise<any> => {
      if (!user) return
      const newPlayers = players.filter((p) => p._id !== playerId)
      const res = await updateTiersList(user.token, { listId: list._id, players: newPlayers })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
      }
      return res
   }
   const editPlayer = async (
      playerId: string,
      playerName: string,
      players: PlayerInterface[]
   ): Promise<any> => {
      if (!user) return
      const newPlayers = players.map((p) =>
         p._id === playerId ? { name: playerName, rates: p.rates } : p
      )
      const res = await updateTiersList(user.token, { listId: list._id, players: newPlayers })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
      }
      return res
   }

   const deleteCard = async (cardId: number, players: PlayerInterface[]): Promise<any> => {
      if (!user) return
      const newDrawnCardsIds = list.drawnCardsIds.filter((id) => id !== cardId)
      const newPlayers = players.map((p) => {
         return { ...p, rates: p.rates.filter((rate) => rate.cardId !== cardId) }
      })
      const res = await updateTiersList(user.token, {
         listId: list._id,
         drawnCardsIds: newDrawnCardsIds,
         players: newPlayers,
      })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
      }
      return res
   }

   const editOptions = async (options: OptionsInterface): Promise<any> => {
      if (!user) return
      const newOptions = options
      const res = await updateTiersList(user.token, { listId: list._id, options: newOptions })
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
      let foundRate: string | undefined = undefined
      list.players.forEach((player) => {
         player.rates.forEach((rate) => {
            if (player._id === playerId && rate.cardId === cardId) {
               foundRate = rate.value
            }
         })
      })
      return foundRate
   }

   const getAvgRate = (
      cardId: number = -1,
      playerId: string = '',
      cardsIds: number[] = filteredCardsDrawn.map((card) => card.id)
   ): number | string => {
      let cardRates: string[] = []
      list.players.forEach((player) => {
         player.rates.forEach((rate) => {
            if (cardId === -1) {
               if (!playerId) {
                  if (cardsIds.includes(rate.cardId)) cardRates.push(rate.value)
               } else {
                  if (player._id === playerId && cardsIds.includes(rate.cardId))
                     cardRates.push(rate.value)
               }
            } else {
               if (!playerId) {
                  if (rate.cardId === cardId && cardsIds.includes(rate.cardId))
                     cardRates.push(rate.value)
               } else {
                  if (
                     player._id === playerId &&
                     rate.cardId === cardId &&
                     cardsIds.includes(rate.cardId)
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

   const getArrayForCsv = (): Array<string[]> => {
      let csvData: Array<string[]> = []

      // Headers
      csvData.push(['CARD', 'RATE', ...list.players.map((p) => p.name)])

      // Drawn cards
      const cards = getCards(CARDS, list.drawnCardsIds)
      cards.forEach((card) => {
         csvData.push([
            `${card.name} (${card.id})`,
            `${getAvgRate(card.id)}`,
            ...list.players.map((p) => `${getRate(card.id, p._id)}`),
         ])
      })

      return csvData
   }

   return loading ? (
      <Loading large={true} />
   ) : (
      <>
         <div className="btns-table-features d-flex align-items-center">
            <Tippy content="Export data to csv" delay={[200, null]}>
               <div>
                  <CSVLink data={getArrayForCsv()}>
                     <BiExport size={30} />
                  </CSVLink>
               </div>
            </Tippy>
            {list.drawnCardsIds.length > 0 && (
               <Tippy content="Show charts" delay={[200, null]}>
                  <div className="pointer" onClick={() => setModalCharts(true)}>
                     <AiOutlineBarChart size={30} />
                  </div>
               </Tippy>
            )}
            <Tippy
               content="If checked, first person, whose rate input box is focused is dependent on the number of cards drawn"
               delay={[200, null]}
            >
               <div
                  className={`pointer ${orderedFocus && 'checked'}`}
                  onClick={() => {
                     setOrderedFocus((v) => !v)
                     editOptions({ ...list.options, orderedFocus: !orderedFocus })
                  }}
               >
                  <GoListOrdered size={28} />
               </div>
            </Tippy>
            {lastId !== -1 && (
               <span style={{ marginLeft: '20px' }}>
                  LAST CARD DRAWN:{' '}
                  <strong>
                     {CARDS.find((c) => c.id === lastId)?.name}
                     {' ('}
                     {CARDS.find((c) => c.id === lastId)?.id}
                     {')'}
                  </strong>
               </span>
            )}
         </div>
         <table>
            <thead>
               <tr>
                  <th
                     className="pointer"
                     onClick={() => {
                        const newSortBy =
                           sortBy === SORT_BY.CARD_ID_ASC
                              ? SORT_BY.CARD_ID_DESC
                              : SORT_BY.CARD_ID_ASC
                        setSortBy(newSortBy)
                        editOptions({ ...list.options, sortBy: newSortBy })
                     }}
                  >
                     {/* Sort by Add Time */}
                     <div
                        className="sort-by-add-time"
                        onClick={(e) => {
                           e.stopPropagation()
                           const newSortBy =
                              sortBy === SORT_BY.ADD_TIME_DESC
                                 ? SORT_BY.ADD_TIME_ASC
                                 : SORT_BY.ADD_TIME_DESC
                           setSortBy(newSortBy)
                           editOptions({ ...list.options, sortBy: newSortBy })
                        }}
                     >
                        {/* Sort arrows */}
                        {sortBy === SORT_BY.ADD_TIME_ASC && (
                           <HiOutlineArrowSmUp className="position-absolute sort-btn" size={20} />
                        )}
                        {sortBy === SORT_BY.ADD_TIME_DESC && (
                           <HiOutlineArrowSmDown className="position-absolute sort-btn" size={20} />
                        )}
                        <div>SORT BY ADD TIME</div>
                     </div>
                     {/* Sort arrows */}
                     {sortBy === SORT_BY.CARD_ID_ASC && (
                        <HiOutlineArrowSmUp
                           className="position-absolute sort-btn"
                           size={20}
                        />
                     )}
                     {sortBy === SORT_BY.CARD_ID_DESC && (
                        <HiOutlineArrowSmDown
                           className="position-absolute sort-btn"
                           size={20}
                        />
                     )}
                     <span className="d-flex justify-content-center align-items-center position-relative ms-auto me-auto">
                        {/* Filter Buttons */}
                        {showFilterCard ? (
                           <RiFilterOffFill
                              className="filter-btn pointer"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setShowFilterCard((prev) => !prev)
                                 setShowAdvFilter(false)
                                 // setShowFilterCard((prev) => {
                                 //    if (prev) setFilterCard('')
                                 //    return !prev
                                 // })
                              }}
                              size={16}
                           />
                        ) : (
                           <RiFilterFill
                              className="filter-btn pointer"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setShowFilterCard((prev) => !prev)
                                 setShowAdvFilter(false)
                              }}
                              size={16}
                           />
                        )}
                        {(filterCard !== '' || !deepEqual(stateFilters, initFilters) || manualIds.length > 0) && (
                           <FcClearFilters
                              className="filter-btn clear pointer"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setFilterCard('')
                                 dispatchFilters({ type: ACTIONS_FILTERS.RESET_ALL })
                                 setShowFilterCard(false)
                                 setManualIds([])
                                 setSelectedIds([])
                              }}
                              size={15}
                           />
                        )}
                        {selectedIds.length > 0 && (
                           <TbFilterOff
                              className="filter-btn clear manual pointer"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setSelectedIds([])
                              }}
                              size={17}
                           />
                        )}
                        {selectedIds.length > 0 && (
                           <ImFilter
                              className="filter-btn pointer"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setManualIds(selectedIds)
                                 setSelectedIds([])
                              }}
                              size={14}
                           />
                        )}
                        {/* Header */}
                        CARD
                     </span>
                     {/* Filter Input */}
                     {showFilterCard && (
                        <>
                           <input
                              type="text"
                              value={showAdvFilter ? '' : filterCard}
                              onChange={(e) => {
                                 if (!showAdvFilter) setFilterCard(e.target.value)
                              }}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="SEARCH BY ID, NAME OR DESC."
                              // onBlur={() => setShowFilterCard(false)}
                              autoFocus
                              onFocus={(e: React.ChangeEvent<HTMLInputElement>) =>
                                 e.target.select()
                              }
                           />
                           <BsFilterRight
                              className="adv-filter"
                              size={30}
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setFilterCard('')
                                 setShowAdvFilter((prev) => !prev)
                              }}
                           />
                           {showAdvFilter && <FiltersSection inTiersMaker={true} />}
                        </>
                     )}
                     {/* Card Counter */}
                     <div className="card-count">{filteredCardsDrawn.length}</div>
                  </th>
                  <th
                     className="pointer"
                     onClick={() => {
                        const newSortBy =
                           sortBy === SORT_BY.RATING_DESC ? SORT_BY.RATING_ASC : SORT_BY.RATING_DESC
                        setSortBy(newSortBy)
                        editOptions({ ...list.options, sortBy: newSortBy })
                     }}
                  >
                     {sortBy === SORT_BY.RATING_ASC && (
                        <HiOutlineArrowSmUp className="position-absolute sort-btn" size={20} />
                     )}
                     {sortBy === SORT_BY.RATING_DESC && (
                        <HiOutlineArrowSmDown className="position-absolute sort-btn" size={20} />
                     )}
                     <span className="d-flex justify-content-center align-items-center position-relative ms-auto me-auto">
                        {/* Filter Buttons */}
                        {showFilterAvgRate ? (
                           <Tippy
                              content='Examples: "5.00", "4.67", "3", ">3.5", "<=2"'
                              delay={[200, null]}
                           >
                              <span style={{ translate: '0 -6%' }}>
                                 <RiFilterOffFill
                                    className="filter-btn pointer"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       setShowFilterAvgRate((prev) => {
                                          if (prev) setFilterAvgRate('')
                                          return !prev
                                       })
                                    }}
                                    size={16}
                                 />
                              </span>
                           </Tippy>
                        ) : (
                           <Tippy
                              content='Examples: "5.00", "4.67", "3", ">3.5", "<=2"'
                              delay={[200, null]}
                           >
                              <span style={{ translate: '0 -6%' }}>
                                 <RiFilterFill
                                    className="filter-btn pointer"
                                    onClick={(e) => {
                                       e.stopPropagation()
                                       setShowFilterAvgRate((prev) => !prev)
                                    }}
                                    size={16}
                                 />
                              </span>
                           </Tippy>
                        )}
                        {filterAvgRate !== '' && (
                           <FcClearFilters
                              className="filter-btn clear pointer"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 setFilterAvgRate('')
                                 setShowFilterAvgRate(false)
                              }}
                              size={15}
                           />
                        )}
                        {/* Header */}
                        RATING
                     </span>
                     {/* Filter Input */}
                     {showFilterAvgRate && (
                        <input
                           type="text"
                           value={filterAvgRate}
                           onChange={(e) => setFilterAvgRate(e.target.value)}
                           onClick={(e) => e.stopPropagation()}
                           placeholder="SEARCH BY RATE"
                           onBlur={() => setShowFilterAvgRate(false)}
                           autoFocus
                           onFocus={(e: React.ChangeEvent<HTMLInputElement>) => e.target.select()}
                        />
                     )}
                  </th>
                  {list.players.map((player, idx) => (
                     <th
                        key={idx}
                        className={isIncomplete(player) ? 'red pointer' : 'pointer'}
                        onClick={() => {
                           let newSortBy = ''
                           if (
                              sortBy.slice(0, 1).toUpperCase() === 'P' &&
                              sortBy === `P${idx}_ASC`
                           ) {
                              newSortBy = `P${idx}_DESC`
                           } else {
                              newSortBy = `P${idx}_ASC`
                           }

                           setSortBy(newSortBy)
                           editOptions({ ...list.options, sortBy: newSortBy })
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
                           <Tippy
                              content="Type 'X' to filter cards with no rate"
                              delay={[200, null]}
                           >
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
                        <td
                           className={selectedIds.includes(card.id) ? 'selected' : ''}
                           onClick={() => {
                              if (selectedIds.includes(card.id)) {
                                 setSelectedIds(selectedIds.filter((id) => id !== card.id))
                              } else {
                                 let newIds = [...selectedIds]
                                 newIds.push(card.id)
                                 setSelectedIds(newIds)
                              }
                           }}
                        >
                           {card.name} ({card.id})
                           <AiFillEye
                              className="pointer position-absolute show-edit-delete second-icon"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 handleClickShowCard(card.id)
                              }}
                              size={16}
                           />
                           <TiDelete
                              className="pointer position-absolute show-edit-delete"
                              onClick={(e) => {
                                 e.stopPropagation()
                                 handleClickDeleteCard(card)
                              }}
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
      </>
   )
}
