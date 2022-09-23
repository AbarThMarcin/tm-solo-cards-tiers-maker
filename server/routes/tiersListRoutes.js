const express = require('express')
const {
   getTiersList,
   getTiersLists,
   createTiersList,
   deleteTiersList,
   updateTiersList,
} = require('../controllers/tiersListControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/getall').get(protect, getTiersLists)
router.route('/get').post(protect, getTiersList)
router.route('/create').post(protect, createTiersList)
router.route('/delete').post(protect, deleteTiersList)
router.route('/update').post(protect, updateTiersList)

module.exports = router
