import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { ListInterface } from '../../interfaces/listInterface'
import { ListLink } from './ListLink'

interface Props {
   lists: ListInterface[]
   deleteList: (list: ListInterface) => Promise<void>
}

export const ListLinks: React.FC<Props> = ({ lists, deleteList }) => {
   return (
      <div>
         <div>TIERS LISTS</div>
         <Nav className="flex-column position-relative">
            <Nav.Link as={NavLink} to="new">
               * CREATE NEW LIST
            </Nav.Link>
            {lists.map((list, idx) => (
               <ListLink key={idx} list={list} deleteList={deleteList} />
            ))}
         </Nav>
      </div>
   )
}
