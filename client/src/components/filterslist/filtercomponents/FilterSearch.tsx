import React from 'react'
import { FiltersActionInt } from '../../../interfaces/filtersInterface'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import { debounce } from '../../../utils/debounce'

interface Props {
   searchRef: React.MutableRefObject<HTMLInputElement>
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterSearch: React.FC<Props> = ({ searchRef, dispatchFilters }) => {

   const handleChangeSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) =>
      dispatchFilters({ type: ACTIONS_FILTERS.SET_SEARCHVALUE, payload: e.target.value })
   )

   return (
      <input
         ref={searchRef}
         type="text"
         onChange={handleChangeSearch}
         placeholder="Search id, name or description..."
      />
   )
}
