import { useState } from 'react'
import { updateTiersList } from '../../api/apiTiersList'
import { useLists } from '../../context/ListsContext'
import { useUser } from '../../context/UserContext'
import { ListInterface, PlayerInterface } from '../../interfaces/listInterface'
import { ACTIONS_LISTS } from '../../store/actions/actionsLists'

interface PropsPlayers {
   list: ListInterface
   handleClickGoBack: () => void
   drawnCardId: number
}

interface RateInterface {
   player: string
   value: string | null
}

export const ListNewRatePlayers: React.FC<PropsPlayers> = ({
   list,
   handleClickGoBack,
   drawnCardId,
}) => {
   const { user } = useUser()
   const { dispatchLists } = useLists()
   const [rates, setRates] = useState<RateInterface[]>(getInitRates())

   function getInitRates(): RateInterface[] {
      return list.players.map((player) => ({ player: player.name, value: null }))
   }

   const handleClickDone = async () => {
      if (user && list.players.length > 0) {
         const newPlayers: PlayerInterface[] = list.players.map((player, idx) => {
            return {
               ...player,
               rates: rates[idx].value
                  ? [...player.rates, { cardId: drawnCardId, value: rates[idx].value || '' }]
                  : player.rates,
            }
         })
         const res = await updateTiersList(user?.token, { listId: list._id, players: newPlayers })
         if (res.success) {
            const newList = res.data
            dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
         }
      }

      handleClickGoBack()
   }

   return (
      <>
         <div className="d-flex justify-content-evenly w-100">
            {list.players.map((player, idx) => (
               <ListNewRatePlayer
                  key={idx}
                  idx={idx}
                  player={player}
                  rates={rates}
                  setRates={setRates}
               />
            ))}
         </div>
         <button onClick={handleClickDone}>DONE</button>
         {list.players.length > 0 && (
            <button onClick={handleClickGoBack}>Continue without rates...</button>
         )}
      </>
   )
}

interface PropsPlayer {
   idx: number
   player: PlayerInterface
   rates: RateInterface[]
   setRates: React.Dispatch<React.SetStateAction<RateInterface[]>>
}

const ListNewRatePlayer: React.FC<PropsPlayer> = ({ idx, player, rates, setRates }) => {
   const rate = rates.filter((r) => r.player === player.name)[0].value

   const handleInputRate = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const lastChar = e.target.value.slice(-1).toUpperCase()
      if ('SABCDEF'.includes(lastChar)) {
         setRates((prevRates) =>
            prevRates.map((prevRate) =>
               prevRate.player !== player.name ? prevRate : { ...prevRate, value: lastChar }
            )
         )
      }
   }

   return (
      <div>
         <div>{player.name}</div>
         <input
            type="text"
            value={rate || ''}
            onInput={handleInputRate}
            autoFocus={idx === 0}
         />
      </div>
   )
}
