import React from 'react'
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi'
import { SORT_BY } from '../../context/FiltersContext'

interface Props {
   sortBy: string
   setSortBy: React.Dispatch<React.SetStateAction<string>>
}

export const SortBy: React.FC<Props> = ({ sortBy, setSortBy }) => {
   return (
      <div style={{ width: '38.5%' }} className='custom-sortby-section'>
         <span>SORT BY:</span>
         <div>
            <button
               className={sortBy === SORT_BY.ID_ASC || sortBy === SORT_BY.ID_DESC ? 'active' : ''}
               onClick={() =>
                  setSortBy(sortBy === SORT_BY.ID_ASC ? SORT_BY.ID_DESC : SORT_BY.ID_ASC)
               }
            >
               ID
               {sortBy === SORT_BY.ID_ASC && <HiOutlineArrowSmDown size="20px" />}
               {sortBy === SORT_BY.ID_DESC && <HiOutlineArrowSmUp size="20px" />}
            </button>
            <button
               className={sortBy === SORT_BY.COST_ASC || sortBy === SORT_BY.COST_DESC ? 'active' : ''}
               onClick={() =>
                  setSortBy(sortBy === SORT_BY.COST_ASC ? SORT_BY.COST_DESC : SORT_BY.COST_ASC)
               }
            >
               COST
               {sortBy === SORT_BY.COST_ASC && <HiOutlineArrowSmDown size="20px" />}
               {sortBy === SORT_BY.COST_DESC && <HiOutlineArrowSmUp size="20px" />}
            </button>
            <button
               className={sortBy === SORT_BY.NAME_ASC || sortBy === SORT_BY.NAME_DESC ? 'active' : ''}
               onClick={() =>
                  setSortBy(sortBy === SORT_BY.NAME_ASC ? SORT_BY.NAME_DESC : SORT_BY.NAME_ASC)
               }
            >
               NAME
               {sortBy === SORT_BY.NAME_ASC && <HiOutlineArrowSmDown size="20px" />}
               {sortBy === SORT_BY.NAME_DESC && <HiOutlineArrowSmUp size="20px" />}
            </button>
         </div>
      </div>
   )
}
