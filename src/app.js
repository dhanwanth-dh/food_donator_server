import cors from 'cors'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import donationRoutes from './routes/donationRoutes.js'

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: process.env.CLIENT_URL ?? 'http://127.0.0.1:5173',
    }),
  )
  app.use(express.json())

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/api/auth', authRoutes)
  app.use('/api/donations', donationRoutes)

  app.use((error, _req, res, _next) => {
    console.error(error)
    res.status(500).json({ message: error.message || 'Internal server error.' })
  })

  return app
}
