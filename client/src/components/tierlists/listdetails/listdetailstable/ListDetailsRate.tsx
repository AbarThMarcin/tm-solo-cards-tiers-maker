import React from 'react'
import { CardInterface } from '../../../../interfaces/cardInterface'
import { ListInterface, PlayerInterface } from '../../../../interfaces/listInterface'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useModal } from '../../../../context/ModalContext'
import { INPUT_TYPES } from '../../../../interfaces/modalInterface'

interface Props {
   list: ListInterface
   player: PlayerInterface
   card: CardInterface
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
   isIncomplete: (player: PlayerInterface) => boolean
}

export const ListDetailsRate: React.FC<Props> = ({
   list,
   player,
   card,
   addRate,
   editRate,
   isIncomplete,
}) => {
   const { setModal } = useModal()
   const rate = list.players
      .find((pl) => pl.name === player.name)
      ?.rates.find((r) => r.cardId === card.id)?.value

   const handleClickAddRate = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.ADD_RATE,
         inputText: '',
         text: 'Enter new rate:',
         onContinue: (val) => addRate(list._id, player._id, card.id, val, list.players),
      })
   }

   const handleClickEditRate = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.EDIT_RATE,
         inputText: rate || '',
         text: 'Edit rate (put empty string to delete the rate):',
         onContinue: (newValue) => editRate(list._id, player._id, card.id, newValue, list.players),
      })
   }

   return (
      <td className={isIncomplete(player) ? 'bg-dark' : ''}>
         {rate ? (
            <>
               {rate}
               <AiTwotoneEdit className="pointer" onClick={handleClickEditRate} />
            </>
         ) : (
            <div className="pointer" onClick={handleClickAddRate}>
               * ADD RATE
            </div>
         )}
      </td>
   )
}
