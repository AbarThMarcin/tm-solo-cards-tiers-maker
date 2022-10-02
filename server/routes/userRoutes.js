const express = require('express')
const { signupUser, signinUser, updateUser } = require('../controllers/userControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/signup').post(signupUser)
router.route('/signin').post(signinUser)
router.route('/update').post(protect, updateUser)

module.exports = router
