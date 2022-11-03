import { useEffect } from 'react'
import { ListCreateSnap } from '../../components/tierlists/ListCreateSnap'
import { ListLinks } from '../../components/tierlists/ListLinks'
import { ListSnap } from '../../components/tierlists/ListSnap'
import { useLists } from '../../context/ListsContext'
import { ListInterface } from '../../interfaces/listInterface'

interface Props {
   stateLists: ListInterface[]
}

export const Lists: React.FC<Props> = ({ stateLists }) => {
   const { selectedListId, setSelectedListId } = useLists()

   useEffect(() => {
      if (stateLists.length && !selectedListId) setSelectedListId(stateLists[0]._id)
   }, [])

   return (
      <>
         <header>
            <h1 className="text-center">TIERS MAKER!</h1>
         </header>
         <p>
            Welcome to the <strong className="red">Terraforming Mars Solo</strong> cards{' '}
            <strong className="red">Tiers Maker</strong>! Create Tiers list and start rating cards!
            The tiers are as follows: from the worst <strong className="red">F</strong> (0 points),
            through E, D, C, B, A and to the best <strong className="green">S</strong> (6 points).
            You can have max. 5 players rating cards in one list. You can have as many lists as you
            want. Have fun!
         </p>
         {stateLists.length === 0 ? (
            // No tiers lists
            <div className="lists-wrapper full-size">
               <ListCreateSnap />
            </div>
         ) : (
            // Tiers lists
            <div className="lists-wrapper full-size">
               <ListLinks />
               {!selectedListId ? <ListCreateSnap /> : <ListSnap />}
            </div>
         )}
      </>
   )
}
