import { useFilters } from '../../../context/FiltersContext'
import { CARDS } from '../../../data/cards'
import Tippy from '@tippyjs/react'

interface Props {
   isPending?: boolean
   loading?: boolean
   showSumOfVP?: boolean
   cardsIds?: number[]
}

export const FilterCounts: React.FC<Props> = ({ isPending, loading, showSumOfVP, cardsIds }) => {
   const { stateFilters } = useFilters()

   return (
      <div style={{ width: '30%', margin: '0 auto' }}>
         {!isPending && !loading && (
            <span style={{ marginRight: '10px' }}>
               CARDS:{' '}
               <span style={{ fontSize: '1.4rem', fontWeight: '600' }}>{cardsIds?.length}</span>
            </span>
         )}
         {showSumOfVP && stateFilters.vp && (
            <Tippy
               content='Only static points. Points "for something" (i.e. 1 point / animal) are excluded'
               delay={[200, null]}
            >
               <span>
                  TOTAL VP:{' '}
                  <span style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                     {CARDS.filter(({ id }) => cardsIds?.includes(id)).reduce(
                        (total, card) => total + card.vp,
                        0
                     )}
                  </span>
               </span>
            </Tippy>
         )}
      </div>
   )
}
