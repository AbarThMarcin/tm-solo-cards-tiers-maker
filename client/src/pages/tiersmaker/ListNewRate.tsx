import React, { useRef, useState } from 'react'
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
import { motion, AnimatePresence } from 'framer-motion'

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
   const cardPlaceholderRef = useRef<HTMLDivElement>(null!)

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
      cardPlaceholderRef.current.classList.add('shake')
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
         <RiArrowGoBackFill className="btn-back pointer" onClick={handleClickGoBack} size={40} />
         <header>
            <h2>
               RATE NEW CARD FOR
               <br />
               <strong className="green">{list.name}</strong>
            </h2>
         </header>
         {drawnCardId > -1 ? (
            <AnimatePresence>
               <motion.div
                  key="keyCardDrawnContainer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="card-drawn-container"
               >
                  <Card card={getCards(CARDS, [drawnCardId])[0]} newRate={true} />
                  <ListNewRatePlayers
                     list={list}
                     handleClickGoBack={handleClickGoBack}
                     drawnCardId={drawnCardId}
                  />
               </motion.div>
            </AnimatePresence>
         ) : // <div className="card-drawn-container">
         //    <Card card={getCards(CARDS, [drawnCardId])[0]} newRate={true} />
         //    <ListNewRatePlayers
         //       list={list}
         //       handleClickGoBack={handleClickGoBack}
         //       drawnCardId={drawnCardId}
         //    />
         // </div>
         list.drawnCardsIds.length === 208 ? (
            <div className="all-cards-drawn">ALL CARDS HAVE BEEN DRAWN</div>
         ) : (
            <>
               <AnimatePresence>
                  <motion.div
                     key="keyCardPlaceholder"
                     ref={cardPlaceholderRef}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.4 }}
                     className="card-placeholder"
                  >
                     ?
                  </motion.div>
               </AnimatePresence>
               <div style={{ marginInline: 'auto', width: 'fit-content' }}>
                  <button
                     className="button-light green"
                     onClick={() => handleClickDrawCard()}
                     disabled={isLoading}
                  >
                     DRAW CARD
                  </button>
                  <button
                     className="button-light grey"
                     onClick={() => handleClickDrawCard(true)}
                     disabled={isLoading}
                  >
                     ADD CARD MANUALLY
                  </button>
               </div>
            </>
         )}
         {error && <div className="error">{error}</div>}
      </>
   ) : (
      <NoTiersList />
   )
}
