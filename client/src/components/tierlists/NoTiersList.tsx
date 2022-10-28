import { RiArrowGoBackFill } from "react-icons/ri"
import { useLocation } from "react-router-dom"
import { useNavigateToTop } from "../../hooks/useNavigateToTop"

export const NoTiersList: React.FC = () => {
   const navigate = useNavigateToTop()
   const {pathname } = useLocation()

   const handleClickGoBack = (): void => {
      navigate('/lists')
   }

   return (
      <>
         <RiArrowGoBackFill className="pointer btn-back" onClick={handleClickGoBack} size={40} />
         <h3 className='list-not-found'>Tiers list&nbsp;<code>{pathname.replace('/lists/', '')}</code>&nbsp;not found.</h3>
      </>
   )
}
