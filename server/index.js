const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/mongoDB')
const { urlNotFound, errorHandler } = require('./middleware/errorsMiddleware')
// Routes
const userRoutes = require('./routes/userRoutes')
const tiersListRoutes = require('./routes/tiersListRoutes')

// Initialize App
const app = express()

// Additional middleware & options
dotenv.config()
app.use(cors({ origin: true }))
app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ limit: '500mb', extended: true, parameterLimit: 100000 }))

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/users', userRoutes)
app.use('/api/tiers-lists', tiersListRoutes)

// Deployment
__dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, 'client/build')))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
} else {
   app.get('/', (req, res) => {
      res.send('API is running...')
   })
}

// Errors middleware
app.use(urlNotFound, errorHandler)

// Run server
const port = process.env.PORT || 5000
app.listen(port, console.log(`Server running on port ${port}`))
