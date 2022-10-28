import { createContext, useContext, useReducer, useState } from 'react'
import { FiltersActionInt, FiltersStateInt } from '../interfaces/filtersInterface'
import { reducerFilters } from '../store/reducers/reducerFilters'

interface FiltersContextInt {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
   sortBy: string,
   setSortBy: React.Dispatch<React.SetStateAction<string>>
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
export const SORT_BY = {
   ID_ASC: 'id_asc',
   ID_DESC: 'id_desc',
   NAME_ASC: 'name_asc',
   NAME_DESC: 'name_desc',
   COST_ASC: 'cost_asc',
   COST_DESC: 'cost_desc',
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

const FiltersContext = createContext<FiltersContextInt>({
   stateFilters: initFilters,
   dispatchFilters: () => {},
   sortBy: SORT_BY.ID_ASC,
   setSortBy: () => {}
})

export const useFilters = () => useContext(FiltersContext)

interface Props {
   children?: React.ReactNode
}

export const FiltersProvider: React.FC<Props> = ({ children }) => {
   const [stateFilters, dispatchFilters] = useReducer(reducerFilters, initFilters)
   const [sortBy, setSortBy] = useState<string>(SORT_BY.ID_ASC)

   return (
      <FiltersContext.Provider value={{ stateFilters, dispatchFilters, sortBy, setSortBy }}>
         {children}
      </FiltersContext.Provider>
   )
}
