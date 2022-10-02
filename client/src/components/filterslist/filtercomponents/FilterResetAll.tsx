import React from 'react'
import { FiltersActionInt } from '../../../interfaces/filtersInterface'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'

interface Props {
   searchRef: React.MutableRefObject<HTMLInputElement>
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterResetAll: React.FC<Props> = ({ searchRef, dispatchFilters }) => {
      return <button
      onClick={() => {
         dispatchFilters({ type: ACTIONS_FILTERS.RESET_ALL })
         searchRef.current.value = ''
      }}
   >
      <small>RESET ALL</small>
   </button>
}