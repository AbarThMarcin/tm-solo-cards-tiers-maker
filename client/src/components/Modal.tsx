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
         setModal((prev) => ({
            ...prev,
            inputText: e.target.value.replace(/[!#%^&*()<,.{}[\]\\+"':@$?=>|;/]/i, ''),
         }))
      } else if (
         modal.inputType === INPUT_TYPES.ADD_RATE ||
         modal.inputType === INPUT_TYPES.EDIT_RATE
      ) {
         // Rate
         const lastChar = e.target.value.slice(-1).toUpperCase()
         if ('SABCDEF'.includes(lastChar)) {
            setModal((prev) => ({ ...prev, inputText: lastChar }))
         }
      } else if (modal.inputType === INPUT_TYPES.CARD) {
         // Card ID
         let val = parseInt(e.target.value).toString()
         if (val === 'NaN') val = ''
         if (val) {
            if (parseInt(val) > 208) val = '208'
         }
         setModal((prev) => ({ ...prev, inputText: val }))
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
               setError('Enter a rate (F to S)')
               return
            }
         }
         // Card ID
         if (modal.inputType === INPUT_TYPES.CARD) {
            if (modal.inputText === '') {
               setError('Enter a card ID')
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
      <div className={`modal-bg ${loading && 'hidden'}`}>
         <div className="modal-container">
            <h3>
               <strong>{modal.text}</strong>
            </h3>
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
               <div className="buttons-container">
                  <button className="button-modal grey" type="button" onClick={closeModal}>
                     CANCEL
                  </button>
                  <button className="button-modal" type="submit" autoFocus={!modal.showInpTxt}>
                     CONTINUE
                  </button>
               </div>
               {error && <h4 className='error'>{error}</h4>}
            </form>
         </div>
      </div>
   )
}
