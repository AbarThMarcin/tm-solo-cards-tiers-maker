import resMln from '../assets/images/game/resources/mln.svg'
import resSteel from '../assets/images/game/resources/steel.svg'
import resTitan from '../assets/images/game/resources/titan.svg'
import resPlant from '../assets/images/game/resources/plant.svg'
import resEnergy from '../assets/images/game/resources/energy.svg'
import resHeat from '../assets/images/game/resources/heat.svg'
import resCard from '../assets/images/game/resources/card.png'
import resMicrobe from '../assets/images/game/resources/microbe.svg'
import resAnimal from '../assets/images/game/resources/animal.svg'
import resScience from '../assets/images/game/resources/science.svg'
import resFighter from '../assets/images/game/resources/fighter.svg'
import resProdBg from '../assets/images/game/resources/prodBg.svg'

export const RESOURCES = {
   MLN: 'mln',
   STEEL: 'steel',
   TITAN: 'titan',
   PLANT: 'plant',
   ENERGY: 'energy',
   HEAT: 'heat',
   CARD: 'card',
   MICROBE: 'microbe',
   ANIMAL: 'animal',
   SCIENCE: 'science',
   FIGHTER: 'fighter',
   PROD_BG: 'prodBg',
   NONE: 'noprod'
}

export const getResIcon = (type: string) => {
   switch (type) {
      case RESOURCES.MLN:
         return resMln
      case RESOURCES.STEEL:
         return resSteel
      case RESOURCES.TITAN:
         return resTitan
      case RESOURCES.PLANT:
         return resPlant
      case RESOURCES.ENERGY:
         return resEnergy
      case RESOURCES.HEAT:
         return resHeat
      case RESOURCES.CARD:
         return resCard
      case RESOURCES.MICROBE:
         return resMicrobe
      case RESOURCES.ANIMAL:
         return resAnimal
      case RESOURCES.SCIENCE:
         return resScience
      case RESOURCES.FIGHTER:
         return resFighter
      case RESOURCES.PROD_BG:
         return resProdBg
      default:
         return
   }
}
