import { Router } from 'express'
import {
  createDonation,
  deleteDonation,
  getDonations,
  requestDonation,
  updateDonation,
  updateDonationStatus,
} from '../controllers/donationController.js'

const router = Router()

router.get('/', getDonations)
router.post('/', createDonation)
router.put('/:id', updateDonation)
router.delete('/:id', deleteDonation)
router.patch('/:id/request', requestDonation)
router.patch('/:id/status', updateDonationStatus)

export default router
