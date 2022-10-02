import { RiArrowGoBackFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

export const NoTiersList: React.FC = () => {
   const navigate = useNavigate()

   const handleClickGoBack = (): void => {
      navigate('/lists')
   }

   return (
      <>
         <RiArrowGoBackFill className="pointer" onClick={handleClickGoBack} />
         <div>No such tiers list</div>
      </>
   )
}
