import React, { useRef } from 'react'
import { FiltersActionInt, FiltersStateInt } from '../../interfaces/filtersInterface'
import { FilterCardType } from './filtercomponents/FilterCardType'
import { FilterCost } from './filtercomponents/FilterCost'
import { FilterParams } from './filtercomponents/FilterParams'
import { FilterProduction } from './filtercomponents/FilterProduction'
import { FilterReqs } from './filtercomponents/FilterReqs'
import { FilterResetAll } from './filtercomponents/FilterResetAll'
import { FilterSearch } from './filtercomponents/FilterSearch'
import { FilterTags } from './filtercomponents/FilterTags'
import { FilterUnits } from './filtercomponents/FilterUnits'
import { FilterVP } from './filtercomponents/FilterVP'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FiltersList: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
   const searchRef = useRef<HTMLInputElement>(null!)

   return (
      <div style={{ backgroundColor: 'rgba(255,0,0,0.2)', width: '500px', minHeight: '150px' }}>
         <h4>FILTERS</h4>
         <FilterCardType stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
         <FilterTags stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
         <FilterCost stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
         <FilterSearch searchRef={searchRef} dispatchFilters={dispatchFilters} />
         <FilterProduction stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
         <FilterVP stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
         <FilterReqs stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
         <FilterParams stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
         <FilterUnits stateFilters={stateFilters} dispatchFilters={dispatchFilters} />
         <FilterResetAll searchRef={searchRef} dispatchFilters={dispatchFilters} />
      </div>
   )
}
