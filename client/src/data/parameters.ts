import iconTr from '../assets/images/parameters/tr.svg'
import iconTemperature from '../assets/images/parameters/temperature.svg'
import iconOcean from '../assets/images/tiles/ocean.svg'
import iconGreenery from '../assets/images/parameters/greenery.svg'
import iconOxygen from '../assets/images/parameters/oxygen.svg'

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