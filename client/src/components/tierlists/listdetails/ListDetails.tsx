import React from 'react'
import { ListInterface, PlayerInterface } from '../../../interfaces/listInterface'
import { ListDetailsTable } from './listdetailstable/ListDetailsTable'

interface Props {
   list: ListInterface
   deletePlayer: (listId: string, playerId: string, players: PlayerInterface[]) => Promise<void>
   editPlayer: (
      listId: string,
      playerId: string,
      playerName: string,
      players: PlayerInterface[]
   ) => Promise<void>
   addRate: (
      listId: string,
      playerId: string,
      cardId: number,
      rate: string,
      players: PlayerInterface[]
   ) => Promise<void>
   editRate: (
      listId: string,
      playerId: string,
      cardId: number,
      newRate: string,
      players: PlayerInterface[]
   ) => Promise<void>
   handleClickAddPlayer: () => void
}

export const ListDetails: React.FC<Props> = ({
   list,
   deletePlayer,
   editPlayer,
   addRate,
   editRate,
   handleClickAddPlayer,
}) => {
   return (
      <>
         <ListDetailsTable
            list={list}
            deletePlayer={deletePlayer}
            editPlayer={editPlayer}
            addRate={addRate}
            editRate={editRate}
            handleClickAddPlayer={handleClickAddPlayer}
         />
         {list.drawnCardsIds.length < 208 && <button>RATE NEW CARD</button>}
         {list.players.length < 5 && <button onClick={handleClickAddPlayer}>ADD NEW PLAYER</button>}
      </>
   )
}
