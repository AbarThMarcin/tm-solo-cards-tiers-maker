import React from 'react'
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi'
import { SORT_BY } from '../pages/CardsList'

interface Props {
   sortBy: string
   setSortBy: React.Dispatch<React.SetStateAction<string>>
}

export const SortBy: React.FC<Props> = ({sortBy, setSortBy}) => {
      return <div style={{ backgroundColor: 'rgba(255,0,0,0.2)', width: '500px', height: '150px' }}>
      <h4>SORT BY</h4>
      <div className="d-flex small w-100">
         <button
            onClick={() =>
               setSortBy(sortBy === SORT_BY.ID_ASC ? SORT_BY.ID_DESC : SORT_BY.ID_ASC)
            }
         >
            ID
            {sortBy === SORT_BY.ID_ASC && <HiOutlineArrowSmDown size="20px" />}
            {sortBy === SORT_BY.ID_DESC && <HiOutlineArrowSmUp size="20px" />}
         </button>
         <button
            onClick={() =>
               setSortBy(
                  sortBy === SORT_BY.COST_ASC ? SORT_BY.COST_DESC : SORT_BY.COST_ASC
               )
            }
         >
            COST
            {sortBy === SORT_BY.COST_ASC && <HiOutlineArrowSmDown size="20px" />}
            {sortBy === SORT_BY.COST_DESC && <HiOutlineArrowSmUp size="20px" />}
         </button>
         <button
            onClick={() =>
               setSortBy(
                  sortBy === SORT_BY.NAME_ASC ? SORT_BY.NAME_DESC : SORT_BY.NAME_ASC
               )
            }
         >
            NAME
            {sortBy === SORT_BY.NAME_ASC && <HiOutlineArrowSmDown size="20px" />}
            {sortBy === SORT_BY.NAME_DESC && <HiOutlineArrowSmUp size="20px" />}
         </button>
      </div>
   </div>
}