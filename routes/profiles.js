import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)
// GET localhost:3000/profiles/:profileId
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
// POST localhost:3000/profiles/:profileId/ghosts
router.post('/:profileId/ghosts', isLoggedIn, profilesCtrl.createGhost)
// DELETE localhost:3000/profiles/ghosts/:ghostId




export {
  router
}