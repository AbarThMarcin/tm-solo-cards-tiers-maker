import React, { useState } from 'react'
import { useModal } from '../context/ModalContext'
import { INPUT_TYPES } from '../interfaces/modalInterface'

export const Modal: React.FC = () => {
   const { modal, setModal } = useModal()
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (loading) return
      setError('')
      // List & Player
      if (modal.inputType === INPUT_TYPES.LIST || modal.inputType === INPUT_TYPES.PLAYER) {
         setModal((prev) => ({ ...prev, inputText: e.target.value.replace(/[!#%^&*()<,.{}[\]\\+"':@$?=>|;/]/i, '') }))
      } else {
         // Rate
         const lastChar = e.target.value.slice(-1).toUpperCase()
         if ('SABCDEF'.includes(lastChar)) {
            setModal((prev) => ({ ...prev, inputText: lastChar }))
         }
      }
   }

   const handleSubmit = async (e: React.FormEvent<EventTarget>): Promise<void> => {
      e.preventDefault()
      if (loading) return
      setError('')
      if (modal.showInpTxt) {
         // List
         if (modal.inputType === INPUT_TYPES.LIST) {
            if (modal.inputText === '') {
               setError('Enter a name')
               return
            }
            if (modal.inputText.length > 30) {
               setError('List Name must have max 30 characters')
               return
            }
         }
         // Player
         if (modal.inputType === INPUT_TYPES.PLAYER) {
            if (modal.inputText === '') {
               setError('Enter a player name')
               return
            }
            if (modal.inputText.length > 30) {
               setError('Player name must have max 30 characters')
               return
            }
         }
         // Add Rate
         if (modal.inputType === INPUT_TYPES.ADD_RATE) {
            if (modal.inputText === '') {
               setError('Enter a rate (F to S')
               return
            }
         }
      }

      setLoading(true)
      const res = await modal.onContinue(modal.inputText)
      if (res.success) {
         closeModal()
      } else {
         setError(res.message)
         setLoading(false)
      }
   }

   const closeModal = (): void => {
      if (loading) return
      setModal((prev) => ({ ...prev, show: false }))
   }

   return (
      <div className="modal-bg">
         <div className="modal-container">
            <h3>{modal.text}</h3>
            <form onSubmit={handleSubmit}>
               {modal.showInpTxt && (
                  <input
                     type="text"
                     autoFocus
                     value={modal.inputText}
                     onChange={handleChangeInput}
                     onFocus={(e: React.ChangeEvent<HTMLInputElement>) => e.target.select()}
                  />
               )}
               {error && <h4>{error}</h4>}
               <button type="button" onClick={closeModal}>
                  CANCEL
               </button>
               <button type="submit" autoFocus={!modal.showInpTxt}>
                  CONTINUE
               </button>
            </form>
         </div>
      </div>
   )
}
