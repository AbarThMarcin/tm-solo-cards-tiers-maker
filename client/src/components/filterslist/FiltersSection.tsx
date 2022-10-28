import React, { useRef, useState } from 'react'
import { useFilters } from '../../context/FiltersContext'
import { FilterTags } from './filtercomponents/FilterTags'
import { FilterCost } from './filtercomponents/FilterCost'
import { FilterSearch } from './filtercomponents/FilterSearch'
import { FilterVP } from './filtercomponents/FilterVP'
import { FilterProduction } from './filtercomponents/FilterProduction'
import { FilterCardType } from './filtercomponents/FilterCardType'
import { FilterReqs } from './filtercomponents/FilterReqs'
import { FilterParams } from './filtercomponents/FilterParams'
import { FilterUnits } from './filtercomponents/FilterUnits'
import { FilterResetAll } from './filtercomponents/FilterResetAll'
import { FilterCounts } from './filtercomponents/FilterCounts'
import { SortBy } from './SortBy'
import { BtnShowHide } from './filtercomponents/BtnShowHide'

interface Props {
   isPending: boolean
   loading: boolean
   showSumOfVP: boolean
   cardsIds: number[]
}

export const FiltersSection: React.FC<Props> = ({ isPending, loading, showSumOfVP, cardsIds }) => {
   const { sortBy, setSortBy } = useFilters()
   const [showFilters, setShowFilters] = useState<boolean>(true)
   const searchRef = useRef<HTMLInputElement>(null!)

   return (
      <section className={`custom-filters-container ${!showFilters && 'hidden'}`}>
         <div className="custom-filters">
            {showFilters && (
               <>
                  {/* Filter By */}
                  <FilterTags />
                  <FilterCost />
                  <FilterSearch searchRef={searchRef} />
                  <FilterVP />
                  <FilterProduction />
                  <FilterCardType />
                  <FilterReqs />
                  <FilterParams />
                  <FilterUnits />
                  <FilterResetAll searchRef={searchRef} />
                  {/* Sort By */}
                  <SortBy sortBy={sortBy} setSortBy={setSortBy} />
               </>
            )}
            {/* Number of filtered cards and total of VP */}
            <FilterCounts
               isPending={isPending}
               loading={loading}
               showSumOfVP={showSumOfVP}
               cardsIds={cardsIds}
            />

            {/* Hide / Show button */}
            <BtnShowHide showFilters={showFilters} setShowFilters={setShowFilters} />
         </div>
      </section>
   )
}
