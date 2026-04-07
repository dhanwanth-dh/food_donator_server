import mongoose from 'mongoose'
import { Donation } from '../models/Donation.js'
import { serializeDonation } from '../utils/serializers.js'

function validateObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value)
}

export async function getDonations(_req, res) {
  const donations = await Donation.find().sort({ createdAt: -1 })
  return res.json({ donations: donations.map(serializeDonation) })
}

export async function createDonation(req, res) {
  const { donorId, donorName, foodName, quantity, category, expiry, city, location, notes } = req.body

  if (!donorId || !donorName || !foodName || !quantity || !category || !expiry || !city || !location) {
    return res.status(400).json({ message: 'Missing required donation fields.' })
  }

  if (!validateObjectId(donorId)) {
    return res.status(400).json({ message: 'Invalid donor id.' })
  }

  const donation = await Donation.create({
    donorId,
    donorName,
    foodName,
    quantity,
    category,
    expiry,
    city,
    location,
    notes: notes ?? '',
  })

  return res.status(201).json({ donation: serializeDonation(donation) })
}

export async function updateDonation(req, res) {
  const { id } = req.params

  const donation = await Donation.findByIdAndUpdate(
    id,
    {
      foodName: req.body.foodName,
      quantity: req.body.quantity,
      category: req.body.category,
      expiry: req.body.expiry,
      city: req.body.city,
      location: req.body.location,
      notes: req.body.notes ?? '',
    },
    { new: true, runValidators: true },
  )

  if (!donation) {
    return res.status(404).json({ message: 'Donation not found.' })
  }

  return res.json({ donation: serializeDonation(donation) })
}

export async function deleteDonation(req, res) {
  const { id } = req.params
  const donation = await Donation.findByIdAndDelete(id)

  if (!donation) {
    return res.status(404).json({ message: 'Donation not found.' })
  }

  return res.status(204).send()
}

export async function requestDonation(req, res) {
  const { id } = req.params
  const { recipientId, recipientName } = req.body

  if (!recipientId || !recipientName) {
    return res.status(400).json({ message: 'Recipient id and name are required.' })
  }

  const donation = await Donation.findById(id)

  if (!donation) {
    return res.status(404).json({ message: 'Donation not found.' })
  }

  donation.status = 'claimed'
  donation.recipientId = recipientId
  donation.recipientName = recipientName

  await donation.save()

  return res.json({ donation: serializeDonation(donation) })
}

export async function updateDonationStatus(req, res) {
  const { id } = req.params
  const { status } = req.body

  if (!status) {
    return res.status(400).json({ message: 'Status is required.' })
  }

  const donation = await Donation.findById(id)

  if (!donation) {
    return res.status(404).json({ message: 'Donation not found.' })
  }

  donation.status = status

  if (status === 'pending') {
    donation.recipientId = null
    donation.recipientName = ''
  }

  await donation.save()

  return res.json({ donation: serializeDonation(donation) })
}
