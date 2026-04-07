import mongoose from 'mongoose'

export async function connectDatabase(connectionString) {
  if (!connectionString) {
    throw new Error('MONGODB_URI is missing. Add it to server/.env before starting the backend.')
  }

  await mongoose.connect(connectionString)
}
