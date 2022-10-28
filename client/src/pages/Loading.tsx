import spinner from '../assets/animated/spinner.gif'

interface Props {
   forCards?: boolean
   large?: boolean
   forPage?: boolean
}

export const Loading: React.FC<Props> = ({ forCards = false, large = false, forPage = false }) => {
   return (
      <div
         className={`spinner ${large && 'spinner-large'} ${forCards && 'spinner-for-cards'} ${
            forPage && 'spinner-for-page'
         }`}
      >
         <img className="full-size" src={spinner} alt="spinner" />
      </div>
   )
}
