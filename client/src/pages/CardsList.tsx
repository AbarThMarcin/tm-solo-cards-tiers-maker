import React, { useEffect, useReducer, useState, useTransition } from 'react'
import { Card } from '../components/Card'
import { CardsListFilters } from '../components/CardsListFilters'
import { CARDS } from '../data/cards'
import { CardInterface } from '../interfaces/cardInterface'
import { reducerFilters } from '../reducers/reducerFilters'
import { matchesAnd, matchesOr } from '../utils/arrays'
import spinner from '../assets/animated/spinner.gif'

export const SORT_BY = {
   ID_ASC: 'id_asc',
   ID_DESC: 'id_asc',
   NAME_ASC: 'name_asc',
   NAME_DESC: 'name_asc',
   COST_ASC: 'cost_asc',
   COST_DESC: 'cost_asc',
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
export const NEG_EQUAL_POS = {
   NEGATIVE: 'negative',
   ALL: 'all',
   POSITIVE: 'positive',
}

const initFilters = {
   searchValue: '',
   tags: [],
   tagsAndOr: AND_OR.AND,
   cardTypes: [],
   cost: null,
   costMinMaxEqual: COST_TYPES.EQUAL,
   production: [],
   productionAndOr: AND_OR.AND,
   vp: null,
   vpNegPosAll: NEG_EQUAL_POS.ALL,
   requirement: null,
   parameters: [],
   parametersAndOr: AND_OR.AND,
   canHaveUnits: null,
}

export const CardsList: React.FC = () => {
   const [isPending, startTransition] = useTransition()
   const [stateFilters, dispatchFilters] = useReducer(reducerFilters, initFilters)
   // const [sortBy, setSortBy] = useState<string>(SORT_BY.ID_ASC)
   const [filteredCardsIds, setFilteredCardsIds] = useState<number[]>(CARDS.map((card) => card.id))

   useEffect(() => {
      startTransition(() => filterCards())
   }, [stateFilters])

   function filterCards(): void {
      let filtered: CardInterface[] = CARDS
      // Filter by Tags
      if (stateFilters.tags.length > 0) {
         filtered =
            stateFilters.tagsAndOr === AND_OR.AND
               ? CARDS.filter((card) => matchesAnd(card.tags, stateFilters.tags))
               : CARDS.filter((card) => matchesOr(card.tags, stateFilters.tags))
      }
      // Filter by Card Type
      if (stateFilters.cardTypes.length > 0) {
         filtered = filtered.filter((card) => stateFilters.cardTypes.includes(card.type))
      }
      setFilteredCardsIds(filtered.map((card) => card.id))
   }

   return (
      <article className="section justify-content-start" style={{ minHeight: '860px' }}>
         {/* Text */}
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
            <CardsListFilters
               stateFilters={stateFilters}
               dispatchFilters={dispatchFilters}
               filterCards={filterCards}
               startTransition={startTransition}
            />
            {!isPending && <span>{filteredCardsIds.length}</span>}
            <div style={{ backgroundColor: 'rgba(255,0,0,0.2)', width: '500px', height: '150px' }}>
               <h4>SORT BY</h4>
            </div>
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
            ) : filteredCardsIds.length === 0 ? (
               'NO CARDS'
            ) : (
               CARDS.filter((card) => filteredCardsIds.includes(card.id)).map((card, idx) => (
                  <div key={idx} className="card-container">
                     <Card card={card} />
                  </div>
               ))
            )}
         </div>
      </article>
   )
}
