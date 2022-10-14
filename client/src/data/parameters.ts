import iconTr from '../assets/images/game/parameters/tr.svg'
import iconTemperature from '../assets/images/game/parameters/temperature.svg'
import iconOcean from '../assets/images/game/tiles/ocean.svg'
import iconGreenery from '../assets/images/game/parameters/greenery.svg'
import iconOxygen from '../assets/images/game/parameters/oxygen.svg'

export const PARAMETERS = {
   TR: 'tr',
   TEMPERATURE: 'temperature',
   OCEAN: 'ocean',
   GREENERY: 'greenery',
   OXYGEN: 'oxygen',
   NONE: 'noparam',
}

export const getParameterIcon = (parameterName: string) => {
   switch (parameterName) {
      case PARAMETERS.TR:
         return iconTr
      case PARAMETERS.TEMPERATURE:
         return iconTemperature
      case PARAMETERS.OCEAN:
         return iconOcean
      case PARAMETERS.GREENERY:
         return iconGreenery
      case PARAMETERS.OXYGEN:
         return iconOxygen
      default:
         break
   }
}