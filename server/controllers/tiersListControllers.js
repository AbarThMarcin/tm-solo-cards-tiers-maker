const asyncHandler = require('express-async-handler')
const TiersList = require('../models/tiersListModel')

const getTiersLists = asyncHandler(async (req, res) => {
   const user = req.user._id
   const tiersLists = await TiersList.find({ user })
   res.status(200).json(tiersLists)
})

const getTiersList = asyncHandler(async (req, res) => {
   const { id } = req.body
   const user = req.user._id

   const tiersList = await TiersList.findOne({ _id: id, user })

   if (tiersList) {
      res.status(200).json({ success: true, data: tiersList })
   } else {
      res.status(403).json({ success: false, message: 'Tiers List not found' })
   }
})

const createTiersList = asyncHandler(async (req, res) => {
   const { name } = req.body
   const user = req.user._id

   const tiersListExists = await TiersList.findOne({ name, user })

   if (tiersListExists) {
      return res.status(400).json({
         success: false,
         message: 'Tiers List under given name already exists',
      })
   }

   const newTiersList = await TiersList.create({ name, user })
   if (newTiersList) {
      res.status(201).json({ success: true, data: newTiersList })
   } else {
      res.status(400).json({ success: false, message: 'Could not create a user. Try again later' })
   }
})

const deleteTiersList = asyncHandler(async (req, res) => {
   const { id } = req.body
   const user = req.user._id

   const tiersList = await TiersList.findOne({ _id: id, user })

   if (tiersList) {
      await tiersList.remove()
      res.status(200).json({ success: true, data: tiersList })
   } else {
      res.status(403).json({ success: false, message: 'Tiers List not found2' })
   }
})

const updateTiersList = asyncHandler(async (req, res) => {
   const { listId, name, drawnCardsIds, players, options } = req.body
   const user = req.user._id

   const tiersList = await TiersList.findOne({ _id: listId, user })

   if (tiersList) {
      tiersList.name = name || tiersList.name
      tiersList.drawnCardsIds = drawnCardsIds || tiersList.drawnCardsIds
      tiersList.players = players || tiersList.players
      tiersList.options = options || tiersList.options

      const updatedTiersList = await tiersList.save()

      res.status(201).json({ success: true, data: updatedTiersList })
   } else {
      res.status(403).json({ success: false, message: 'Tiers List not found' })
   }
})

module.exports = { getTiersList, getTiersLists, createTiersList, deleteTiersList, updateTiersList }
