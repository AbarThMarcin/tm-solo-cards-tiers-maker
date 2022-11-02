import { forwardRef, useRef, useState } from 'react'
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
   // References
   const refP1 = useRef<HTMLInputElement>(null!)
   const refP2 = useRef<HTMLInputElement>(null!)
   const refP3 = useRef<HTMLInputElement>(null!)
   const refP4 = useRef<HTMLInputElement>(null!)
   const refP5 = useRef<HTMLInputElement>(null!)
   const refBtnDone = useRef<HTMLButtonElement>(null!)

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

   const getRef = (idx: number): React.MutableRefObject<HTMLInputElement> | undefined => {
      switch (idx) {
         case 0:
            return refP1
         case 1:
            return refP2
         case 2:
            return refP3
         case 3:
            return refP4
         case 4:
            return refP5
         default:
            return
      }
   }

   return (
      <>
         <div className="player-inputs">
            {list.players.map((player, idx) => (
               <ListNewRatePlayer
                  key={idx}
                  ref={getRef(idx)}
                  idx={idx}
                  player={player}
                  players={list.players}
                  rates={rates}
                  setRates={setRates}
                  refP1={refP1}
                  refP2={refP2}
                  refP3={refP3}
                  refP4={refP4}
                  refP5={refP5}
                  refBtnDone={refBtnDone}
               />
            ))}
         </div>
         <div className="buttons">
            <button ref={refBtnDone} className="button-light green" onClick={handleClickDone}>
               DONE
            </button>
            {list.players.length > 0 && (
               <button className="button-light grey" onClick={handleClickGoBack}>
                  Continue without rates...
               </button>
            )}
         </div>
      </>
   )
}

interface PropsPlayer {
   idx: number
   player: PlayerInterface
   players: PlayerInterface[]
   rates: RateInterface[]
   setRates: React.Dispatch<React.SetStateAction<RateInterface[]>>
   refP1: React.MutableRefObject<HTMLInputElement>
   refP2: React.MutableRefObject<HTMLInputElement>
   refP3: React.MutableRefObject<HTMLInputElement>
   refP4: React.MutableRefObject<HTMLInputElement>
   refP5: React.MutableRefObject<HTMLInputElement>
   refBtnDone: React.MutableRefObject<HTMLButtonElement>
}

const ListNewRatePlayer = forwardRef<HTMLInputElement, PropsPlayer>((props, ref) => {
   const rate = props.rates.filter((r) => r.player === props.player.name)[0].value

   const handleInputRate = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const lastChar = e.target.value.slice(-1).toUpperCase()
      if ('SABCDEF'.includes(lastChar)) {
         props.setRates((prevRates) =>
            prevRates.map((prevRate) =>
               prevRate.player !== props.player.name ? prevRate : { ...prevRate, value: lastChar }
            )
         )
         setFocus()
      }
   }

   function setFocus() {
      if (props.players.length - 1 === props.idx) {
         props.refBtnDone.current.focus()
      } else {
         switch (props.idx) {
            case 0:
               props.refP2.current.focus()
               break
            case 1:
               props.refP3.current.focus()
               break
            case 2:
               props.refP4.current.focus()
               break
            case 3:
               props.refP5.current.focus()
               break
            case 4:
               props.refBtnDone.current.focus()
               break
            default:
               break
         }
      }
      
   }

   return (
      <div>
         <div>{props.player.name}</div>
         <input
            ref={ref}
            className={`${rate?.toLowerCase()}-tier`}
            type="text"
            value={rate || ''}
            onInput={handleInputRate}
            autoFocus={props.idx === 0}
         />
      </div>
   )
})
