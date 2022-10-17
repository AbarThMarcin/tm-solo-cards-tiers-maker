import { RiArrowGoBackFill } from "react-icons/ri"
import { useNavigateToTop } from "../../hooks/useNavigateToTop"

export const NoTiersList: React.FC = () => {
   const navigate = useNavigateToTop()

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
