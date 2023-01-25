import { useEffect, useState, useTransition } from 'react'
import { CARDS } from '../data/cards'
import { CardInterface } from '../interfaces/cardInterface'
import { matchesAnd, matchesOr } from '../utils/arrays'
import { FiltersStateInt } from '../interfaces/filtersInterface'
import { FiltersSection } from '../components/filterslist/FiltersSection'
import { CardsList } from '../components/filterslist/CardsList'
import { AND_OR, COST_TYPES, NEG_ALL_POS, SORT_BY, useFilters } from '../context/FiltersContext'
import { ACTIONS_FILTERS } from '../store/actions/actionsFilters'

export const CardsListPage: React.FC = () => {
   const [isPending, startTransition] = useTransition()
   const { stateFilters, dispatchFilters, sortBy } = useFilters()
   const [cardsIds, setCardsIds] = useState<number[]>([])
   const [loading, setLoading] = useState(true)
   const [showSumOfVP, setShowSumOfVP] = useState<boolean>(false)

   useEffect(() => {
      setCardsIds(CARDS.map(({ id }) => id))
      setLoading(false)
      dispatchFilters({ type: ACTIONS_FILTERS.RESET_ALL })
   }, [])

   useEffect(() => {
      startTransition(() => {
         filterCards()
         if (stateFilters.vp) {
            setShowSumOfVP(true)
         } else {
            setShowSumOfVP(false)
         }
      })
   }, [stateFilters])

   useEffect(() => {
      startTransition(() => {
         if (cardsIds.length > 0) setCardsIds(sortedCardsIds(cardsIds))
      })
   }, [sortBy])

   function filterCards(): void {
      let newCards: CardInterface[] = CARDS
      newCards = getFilteredTags(newCards, stateFilters)
      newCards = getFilteredCardType(newCards, stateFilters)
      newCards = getFilteredCost(newCards, stateFilters)
      newCards = getFilteredSearch(newCards, stateFilters)
      newCards = getFilteredProduction(newCards, stateFilters)
      newCards = getFilteredVP(newCards, stateFilters)
      newCards = getFilteredRequirements(newCards, stateFilters)
      newCards = getFilteredParameters(newCards, stateFilters)
      newCards = getFilteredCanHaveUnits(newCards, stateFilters)
      const newCardsIds = newCards.map(({ id }) => id)
      const sortedNewCardsIds = sortedCardsIds(newCardsIds)
      setCardsIds(sortedNewCardsIds)
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

   function sortedCardsIds(cardsIds: number[]): number[] {
      let sorted: CardInterface[] = CARDS.filter(({ id }) => cardsIds.includes(id))
      switch (sortBy) {
         case SORT_BY.ID_ASC:
            sorted.sort((cardA, cardB) => cardA.id - cardB.id)
            break
         case SORT_BY.ID_DESC:
            sorted.sort((cardA, cardB) => cardB.id - cardA.id)
            break
         case SORT_BY.COST_ASC:
            sorted.sort((cardA, cardB) => cardA.cost - cardB.cost)
            break
         case SORT_BY.COST_DESC:
            sorted.sort((cardA, cardB) => cardB.cost - cardA.cost)
            break
         case SORT_BY.NAME_ASC:
            sorted.sort((cardA, cardB) => {
               if (cardA.name < cardB.name) return -1
               if (cardA.name > cardB.name) return 1
               return 0
            })
            break
         case SORT_BY.NAME_DESC:
            sorted.sort((cardA, cardB) => {
               if (cardA.name > cardB.name) return -1
               if (cardA.name < cardB.name) return 1
               return 0
            })
            break
         default:
            break
      }
      return sorted.map(({ id }) => id)
   }

   return (
      <article className="article-section-content">
         <header className="w-100 ms-auto me-auto custom-title">
            <h1 className="text-center" style={{ fontSize: '4rem' }}>
               TERRAFORMING MARS SOLO - CARDS LIST
            </h1>
            <p className="text-center">
               Welcome to the cards list! Browse cards by tags, cost, production, requirements and
               many more!
               <br />
               <strong className='yellow'>IMPORTANT:</strong> Selecting 'AND' shows cards that meet all requirements in
               the current section, while selecting
               <br />
               'OR' shows every card that has at least one of the selected elements in the current
               filter section.
            </p>
         </header>
         <FiltersSection
            isPending={isPending}
            loading={loading}
            showSumOfVP={showSumOfVP}
            cardsIds={cardsIds}
         />
         <CardsList cardsIds={cardsIds} isPending={isPending} loading={loading} />
      </article>
   )
}
