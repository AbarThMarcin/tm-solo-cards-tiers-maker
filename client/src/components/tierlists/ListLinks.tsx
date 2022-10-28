import React from 'react'
import { useLists } from '../../context/ListsContext'
import { ListLink } from './ListLink'

export const ListLinks: React.FC = () => {
   const { stateLists } = useLists()

   return (
      <div className='list-links'>
         <h4>TIERS LISTS</h4>
         <ul>
            <ListLink />
            {stateLists.map((list, idx) => (
               <ListLink key={idx} list={list} />
            ))}
         </ul>
         <div className="horizontal-line"></div>
      </div>
   )
}
