const mongoose = require('mongoose')
const { getRangeInt } = require('../utils/numberArray')

const tiersListSchema = mongoose.Schema({
   name: String,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
   },
   drawnCardsIds: {
      type: [Number],
      required: true,
      default: [],
   },
   players: {
      type: [
         {
            name: String,
            rates: {
               type: [
                  {
                     cardId: Number,
                     value: String,
                  },
               ],
               required: true,
               default: [],
            },
         },
      ],
      required: true,
      default: [],
   },
   options: {
      orderedFocus: {
         type: Boolean,
         default: false,
      }
   }
})

module.exports = mongoose.model('tiers-lists', tiersListSchema)
