import { useMemo } from 'react'
import { useModal } from '../context/ModalContext'
import { CARDS } from '../data/cards'
import { Card } from './Card'

export const ModalCard: React.FC = () => {
   const { modalCardId, setModalCardId } = useModal()
   const card = useMemo(() => CARDS.find((c) => c.id === modalCardId), [modalCardId])

   return (
      <div className="modal-bg" onClick={() => setModalCardId(0)}>
         {card && <Card card={card} modal={true} />}
      </div>
   )
}
