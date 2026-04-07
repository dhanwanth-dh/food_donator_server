import dotenv from 'dotenv'
import { createApp } from './app.js'
import { connectDatabase } from './config/db.js'
import { seedDatabase } from './seed/seedDatabase.js'

dotenv.config()

const app = createApp()
const port = Number(process.env.PORT ?? 5000)

async function startServer() {
  await connectDatabase(process.env.MONGODB_URI)
  await seedDatabase()

  app.listen(port, () => {
    console.log(`FoodBridge API listening on http://127.0.0.1:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
