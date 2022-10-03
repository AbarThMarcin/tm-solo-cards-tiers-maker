import { ListCreateSnap } from '../../components/tierlists/ListCreateSnap'
import { ListLinks } from '../../components/tierlists/ListLinks'
import { ListSnap } from '../../components/tierlists/ListSnap'
import { ListInterface } from '../../interfaces/listInterface'

interface Props {
   stateLists: ListInterface[]
   selectedListId: string | null
}

export const Lists: React.FC<Props> = ({ stateLists, selectedListId }) => {
   return (
      <>
         <header className="mt-5">
            <p>
               Welcome to the tiers list! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
               Harum amet mollitia quidem officiis cupiditate obcaecati autem nam, eaque odio
               officia assumenda distinctio quae et ab, accusantium optio id. Aspernatur, illo?
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque porro obcaecati
               labore nemo ut tenetur asperiores minus soluta consequuntur, possimus dolores
               repellendus, quisquam sed ipsam, adipisci ex itaque corporis. Enim.
            </p>
         </header>
         {stateLists.length === 0 ? (
            // No tiers lists
            <ListCreateSnap />
         ) : (
            // Tiers lists
            <div className="d-flex w-100 h-100 mt-5">
               <ListLinks />
               {!selectedListId ? <ListCreateSnap /> : <ListSnap />}
            </div>
         )}
      </>
   )
}
