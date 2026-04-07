import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import { serializeUser } from '../utils/serializers.js'

export async function register(req, res) {
  const { name, email, password, city, role } = req.body

  if (!name || !email || !password || !city || !role) {
    return res.status(400).json({ message: 'Name, email, password, city, and role are required.' })
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() })

  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists.' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    city: city.trim(),
    role,
  })

  return res.status(201).json({ user: serializeUser(user) })
}

export async function login(req, res) {
  const { email, password, role } = req.body

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required.' })
  }

  const user = await User.findOne({ email: email.toLowerCase().trim(), role })

  if (!user) {
    return res.status(404).json({ message: 'No matching account found for this role.' })
  }

  const passwordMatches = await bcrypt.compare(password, user.password)

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Incorrect password.' })
  }

  return res.json({ user: serializeUser(user) })
}
