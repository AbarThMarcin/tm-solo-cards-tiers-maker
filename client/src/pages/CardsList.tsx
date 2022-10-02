import React, { useEffect, useReducer, useState, useTransition } from 'react'
import { Card } from '../components/Card'
import { FiltersList } from '../components/filterslist/FiltersList'
import { CARDS } from '../data/cards'
import { CardInterface } from '../interfaces/cardInterface'
import { reducerFilters } from '../store/reducers/reducerFilters'
import { getCards, matchesAnd, matchesOr } from '../utils/arrays'
import spinner from '../assets/animated/spinner.gif'
import { FiltersStateInt } from '../interfaces/filtersInterface'
import { SortBy } from '../components/SortBy'

export const SORT_BY = {
   ID_ASC: 'id_asc',
   ID_DESC: 'id_desc',
   NAME_ASC: 'name_asc',
   NAME_DESC: 'name_desc',
   COST_ASC: 'cost_asc',
   COST_DESC: 'cost_desc',
}
export const COST_TYPES = {
   MIN: 'min',
   MAX: 'max',
   EQUAL: 'equal',
}
export const AND_OR = {
   AND: 'and',
   OR: 'or',
}
export const NEG_ALL_POS = {
   NEGATIVE: 'negative',
   ALL: 'all',
   POSITIVE: 'positive',
}

export const initFilters = {
   searchValue: '',
   tags: [],
   tagsAndOr: AND_OR.AND,
   cardTypes: [],
   cost: 0,
   costMinMaxEqual: COST_TYPES.MIN,
   production: [],
   productionAndOr: AND_OR.AND,
   vp: null,
   vpNegPosAll: NEG_ALL_POS.ALL,
   requirements: [],
   requirementsAndOr: AND_OR.AND,
   parameters: [],
   parametersAndOr: AND_OR.AND,
   canHaveUnits: [],
}

export const CardsList: React.FC = () => {
   const [isPending, startTransition] = useTransition()
   const [stateFilters, dispatchFilters] = useReducer(reducerFilters, initFilters)
   const [sortBy, setSortBy] = useState<string>(SORT_BY.ID_ASC)
   const [cardsIds, setCardsIds] = useState<number[]>(CARDS.map(({ id }) => id))

   useEffect(() => {
      startTransition(() => filterCards())
   }, [stateFilters])

   useEffect(() => {
      startTransition(() => setCardsIds(sortedCardsIds(cardsIds)))
   }, [sortBy])

   function filterCards(): void {
      let newCards: CardInterface[] = CARDS
      newCards = filteredByTags(newCards, stateFilters)
      newCards = filteredByCardType(newCards, stateFilters)
      newCards = filteredByCost(newCards, stateFilters)
      newCards = filteredBySearch(newCards, stateFilters)
      newCards = filteredByProduction(newCards, stateFilters)
      newCards = filteredByVP(newCards, stateFilters)
      newCards = filteredByRequirements(newCards, stateFilters)
      newCards = filteredByParameters(newCards, stateFilters)
      newCards = filteredByCanHaveUnits(newCards, stateFilters)
      const newCardsIds = newCards.map(({ id }) => id)
      const sortedNewCardsIds = sortedCardsIds(newCardsIds)
      setCardsIds(sortedNewCardsIds)
   }

   function filteredByTags(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.tags.length > 0) {
         filtered =
            stateFilters.tagsAndOr === AND_OR.AND
               ? CARDS.filter((card) => matchesAnd(card.tags, stateFilters.tags))
               : CARDS.filter((card) => matchesOr(card.tags, stateFilters.tags))
      }
      return filtered
   }
   function filteredByCardType(
      filtered: CardInterface[],
      stateFilters: FiltersStateInt
   ): CardInterface[] {
      if (stateFilters.cardTypes.length > 0) {
         filtered = filtered.filter((card) => stateFilters.cardTypes.includes(card.type))
      }
      return filtered
   }
   function filteredByCost(
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
   function filteredBySearch(
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
   function filteredByProduction(
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
   function filteredByVP(
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
   function filteredByRequirements(
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
   function filteredByParameters(
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
   function filteredByCanHaveUnits(
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
      <article className="section justify-content-start" style={{ minHeight: '860px' }}>
         {/* Header */}
         <section className="w-75">
            <header>
               <h1 className="text-center">TERRAFORMING MARS SOLO - CARDS LIST</h1>
            </header>
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis maiores molestiae
               commodi est architecto dolore fugit cum eaque consequuntur, dolorem deserunt quaerat?
               Doloremque repellat excepturi libero possimus accusamus porro voluptas ipsum sequi
               non reprehenderit sit velit nulla rem.
            </p>
         </section>
         <div className="w-100 d-flex justify-content-between">
            {/* Filters Section */}
            <FiltersList stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
            {/* Additional Information */}
            {!isPending && <span>{cardsIds.length}</span>}
            {!isPending && stateFilters.vp && (
               <span>
                  {CARDS.filter(({ id }) => cardsIds.includes(id)).reduce(
                     (total, card) => total + card.vp,
                     0
                  )}
               </span>
            )}
            {/* Sort By Section */}
            <SortBy sortBy={sortBy} setSortBy={setSortBy} />
         </div>
         {/* Cards */}
         <div
            className="d-flex justify-content-center flex-wrap mt-4 position-relative"
            style={{ gap: '20px', opacity: isPending ? '0.2' : '1' }}
         >
            {isPending ? (
               <div className="spinner spinner-lg">
                  <img className="full-size" src={spinner} alt="spinner" />
               </div>
            ) : cardsIds.length === 0 ? (
               'NO CARDS'
            ) : (
               getCards(CARDS, cardsIds).map((card, idx) => <Card key={idx} card={card} />)
            )}
         </div>
      </article>
   )
}
