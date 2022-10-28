import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'

interface Props {
   showFilters: boolean
   setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
}

export const BtnShowHide: React.FC<Props> = ({ showFilters, setShowFilters }) => {
   return (
      <div
         className="pointer position-absolute"
         style={{ bottom: '5px', right: '15px', width: '30px', height: '30px', backgroundColor: '#000' }}
         onClick={() => setShowFilters((prev) => !prev)}
      >
         {showFilters ? (
            <MdOutlineKeyboardArrowUp size='25px' />
         ) : (
            <MdOutlineKeyboardArrowDown size='25px' />
         )}
      </div>
   )
}
