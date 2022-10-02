import React from 'react'
import { useParams } from 'react-router-dom'
import { NoTiersList } from '../../components/tierlists/NoTiersList'
import { useLists } from '../../context/ListsContext'
import { toUrl } from '../../utils/strings'

export const ListNewRate: React.FC = () => {
   const { listName } = useParams()
   const { stateLists } = useLists()
   const list = stateLists.find((l) => toUrl(l.name) === listName)

   return list ? <div>New List</div> : <NoTiersList />
}
