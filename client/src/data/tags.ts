import buildingTag from '../assets/images/game/tags/building.svg'
import spaceTag from '../assets/images/game/tags/space.svg'
import powerTag from '../assets/images/game/tags/power.svg'
import scienceTag from '../assets/images/game/tags/science.svg'
import jovianTag from '../assets/images/game/tags/jovian.svg'
import earthTag from '../assets/images/game/tags/earth.svg'
import plantTag from '../assets/images/game/tags/plant.svg'
import microbeTag from '../assets/images/game/tags/microbe.svg'
import animalTag from '../assets/images/game/tags/animal.svg'
import cityTag from '../assets/images/game/tags/city.svg'
import eventTag from '../assets/images/game/tags/event.svg'

export const TAGS = {
   BUILDING: 'building',
   SPACE: 'space',
   POWER: 'power',
   SCIENCE: 'science',
   JOVIAN: 'jovian',
   EARTH: 'earth',
   PLANT: 'plant',
   MICROBE: 'microbe',
   ANIMAL: 'animal',
   CITY: 'city',
   EVENT: 'event',
   NONE: 'notag'
}

export const getTagIcon = (tagName: string) => {
   switch (tagName) {
      case TAGS.BUILDING:
         return buildingTag
      case TAGS.SPACE:
         return spaceTag
      case TAGS.POWER:
         return powerTag
      case TAGS.SCIENCE:
         return scienceTag
      case TAGS.JOVIAN:
         return jovianTag
      case TAGS.EARTH:
         return earthTag
      case TAGS.PLANT:
         return plantTag
      case TAGS.MICROBE:
         return microbeTag
      case TAGS.ANIMAL:
         return animalTag
      case TAGS.CITY:
         return cityTag
      case TAGS.EVENT:
         return eventTag
      default:
         break
   }
}
