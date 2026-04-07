import bcrypt from 'bcryptjs'
import { Donation } from '../models/Donation.js'
import { User } from '../models/User.js'

export async function seedDatabase() {
  const userCount = await User.countDocuments()

  if (userCount > 0) {
    return
  }

  const hashedPassword = await bcrypt.hash('password123', 10)

  const [donor, ngo, admin, household, partnerNgo] = await User.create([
    {
      name: 'Harvest Bistro',
      email: 'donor@foodbridge.org',
      password: hashedPassword,
      role: 'donor',
      city: 'Bengaluru',
    },
    {
      name: 'Care Circle NGO',
      email: 'ngo@foodbridge.org',
      password: hashedPassword,
      role: 'ngo',
      city: 'Bengaluru',
    },
    {
      name: 'Platform Admin',
      email: 'admin@foodbridge.org',
      password: hashedPassword,
      role: 'admin',
      city: 'Bengaluru',
    },
    {
      name: 'Meera Family Kitchen',
      email: 'family@foodbridge.org',
      password: hashedPassword,
      role: 'donor',
      city: 'Mysuru',
    },
    {
      name: 'Smile Support Trust',
      email: 'smile@foodbridge.org',
      password: hashedPassword,
      role: 'ngo',
      city: 'Mysuru',
    },
  ])

  await Donation.create([
    {
      donorId: donor._id,
      donorName: donor.name,
      foodName: 'Fresh veg biryani',
      quantity: '30 meal boxes',
      category: 'cooked',
      expiry: 'Today, 9:00 PM',
      city: 'Bengaluru',
      location: '12 Residency Road, Bengaluru',
      notes: 'Packed within the last hour. Collection container available.',
      status: 'pending',
    },
    {
      donorId: donor._id,
      donorName: donor.name,
      foodName: 'Packaged bread loaves',
      quantity: '18 packets',
      category: 'packaged',
      expiry: 'Tomorrow, 10:00 AM',
      city: 'Bengaluru',
      location: '12 Residency Road, Bengaluru',
      notes: 'Sealed and labeled by supplier.',
      status: 'claimed',
      recipientId: ngo._id,
      recipientName: ngo.name,
    },
    {
      donorId: household._id,
      donorName: household.name,
      foodName: 'Seasonal fruits',
      quantity: '4 crates',
      category: 'produce',
      expiry: 'Today, 7:00 PM',
      city: 'Mysuru',
      location: '45 Lakshmipuram, Mysuru',
      notes: 'Bananas and oranges, freshly sorted.',
      status: 'completed',
      recipientId: partnerNgo._id,
      recipientName: partnerNgo.name,
    },
  ])

  void admin
}
