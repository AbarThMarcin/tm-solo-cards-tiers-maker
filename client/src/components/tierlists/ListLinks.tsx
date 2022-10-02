import React from 'react'
import { useLists } from '../../context/ListsContext'
import { ListLink } from './ListLink'

export const ListLinks: React.FC = () => {
   const { stateLists } = useLists()

   return (
      <div>
         <div>TIERS LISTS</div>
         <div className="flex-column position-relative">
            <ListLink />
            {stateLists.map((list, idx) => (
               <ListLink key={idx} list={list} />
            ))}
         </div>
      </div>
   )
}
