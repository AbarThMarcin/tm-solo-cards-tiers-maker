import { CARDS } from '../../data/cards'
import { Loading } from '../../pages/Loading'
import { getCards } from '../../utils/arrays'
import { Card } from '../Card'

interface Props {
   cardsIds: number[]
   isPending: boolean
   loading: boolean
}

export const CardsList: React.FC<Props> = ({ cardsIds, isPending, loading }) => {
   return isPending || loading ? (
      <Loading forCards={true} large={true} />
   ) : (
      <div className="d-flex justify-content-center flex-wrap mt-4" style={{ gap: '20px' }}>
         {cardsIds.length === 0 ? (
            <div className="no-cards">NO CARDS</div>
         ) : (
            getCards(CARDS, cardsIds).map((card, idx) => <Card key={idx} card={card} />)
         )}
      </div>
   )
}
