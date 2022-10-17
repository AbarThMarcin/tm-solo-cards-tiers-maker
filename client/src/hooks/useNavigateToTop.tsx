import { useNavigate } from 'react-router-dom'

export const useNavigateToTop = () => {
   const navigate = useNavigate()

   const navigateAndReset = (to: string) => {
      navigate(to)
      window.scrollTo(0, 0)
   }

   return navigateAndReset
}
