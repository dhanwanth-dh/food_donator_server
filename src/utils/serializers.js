export function serializeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    city: user.city,
  }
}

export function serializeDonation(donation) {
  return {
    id: donation._id.toString(),
    donorId: donation.donorId?.toString?.() ?? donation.donorId,
    donorName: donation.donorName,
    foodName: donation.foodName,
    quantity: donation.quantity,
    category: donation.category,
    expiry: donation.expiry,
    city: donation.city,
    location: donation.location,
    notes: donation.notes,
    status: donation.status,
    recipientId: donation.recipientId?.toString?.() ?? donation.recipientId,
    recipientName: donation.recipientName,
    createdAt: donation.createdAt,
    updatedAt: donation.updatedAt,
  }
}
