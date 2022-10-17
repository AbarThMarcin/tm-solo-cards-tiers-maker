import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLists } from '../../context/ListsContext'
import { NoTiersList } from '../../components/tierlists/NoTiersList'
import { toUrl } from '../../utils/strings'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { getCards, sequence } from '../../utils/arrays'
import { getRandIntNumbers } from '../../api/apiMisc'
import { CARDS } from '../../data/cards'
import { Card } from '../../components/Card'
import { ACTIONS_LISTS } from '../../store/actions/actionsLists'
import { updateTiersList } from '../../api/apiTiersList'
import { useUser } from '../../context/UserContext'
import { ListNewRatePlayers } from '../../components/tierlists/ListNewRatePlayers'
import { useModal } from '../../context/ModalContext'
import { INPUT_TYPES } from '../../interfaces/modalInterface'
import { useNavigateToTop } from '../../hooks/useNavigateToTop'

export const ListNewRate: React.FC = () => {
   const navigate = useNavigateToTop()
   const { listName } = useParams()
   const { user } = useUser()
   const { setModal } = useModal()
   const { stateLists, dispatchLists } = useLists()
   const list = stateLists.find((l) => toUrl(l.name) === listName)
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [error, setError] = useState<string>('')
   const [drawnCardId, setDrawnCardId] = useState<number>(-1)

   const handleClickDrawCard = (manually: boolean = false): void => {
      if (manually) {
         setModal({
            show: true,
            showInpTxt: true,
            inputType: INPUT_TYPES.CARD,
            inputText: '',
            text: 'Enter card ID:',
            onContinue: (id) => drawCard(id),
         })
      } else {
         drawCard()
      }
   }

   const drawCard = async (idProvided: string = ''): Promise<any> => {
      if (isLoading || !list || !user) return

      if (list.drawnCardsIds.includes(parseInt(idProvided))) {
         return { success: false, message: `Card with ID: ${idProvided} is already drawn.` }
      }

      setIsLoading(true)
      setError('')
      const remainingCardsIds: number[] = sequence(1, 208).filter(
         (n) => !list.drawnCardsIds.includes(n)
      )

      let newCardId: number
      let newCardsDrawnIds: number[]
      if (idProvided) {
         newCardId = remainingCardsIds.filter((id) => id === parseInt(idProvided))[0]
         newCardsDrawnIds = [...list.drawnCardsIds, newCardId]
      } else {
         const res_getInt: any =
            remainingCardsIds.length > 1
               ? await getRandIntNumbers(1, 0, remainingCardsIds.length - 1)
               : [0]
         const index: number = res_getInt[0]
         newCardId = remainingCardsIds[index]
         newCardsDrawnIds = [...list.drawnCardsIds, newCardId]
      }

      const res_updateList = await updateTiersList(user.token, {
         listId: list._id,
         drawnCardsIds: newCardsDrawnIds,
      })
      if (res_updateList.success) {
         const newList = res_updateList.data
         dispatchLists({ type: ACTIONS_LISTS.EDIT_LIST, payload: newList })
         setDrawnCardId(newCardId)
      } else {
         setError('Something went wrong')
      }
      setIsLoading(false)
      return res_updateList
   }

   const handleClickGoBack = (): void => {
      navigate(`/lists/${listName}`)
   }

   return list ? (
      <>
         <RiArrowGoBackFill className="pointer" onClick={handleClickGoBack} />
         <div>New card for: {list.name}</div>
         {drawnCardId > -1 ? (
            <>
               <Card card={getCards(CARDS, [drawnCardId])[0]} />
               <ListNewRatePlayers
                  list={list}
                  handleClickGoBack={handleClickGoBack}
                  drawnCardId={drawnCardId}
               />
            </>
         ) : list.drawnCardsIds.length === 208 ? (
            <div>All Cards have been drawn</div>
         ) : (
            <>
               <span>"NO CARD YET"</span>
               <button onClick={() => handleClickDrawCard()} disabled={isLoading}>
                  DRAW CARD
               </button>
               <button onClick={() => handleClickDrawCard(true)} disabled={isLoading}>
                  ADD CARD MANUALLY
               </button>
            </>
         )}
         {error && <div>{error}</div>}
      </>
   ) : (
      <NoTiersList />
   )
}
