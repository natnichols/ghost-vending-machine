import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)
// GET localhost:3000/profiles/new

// GET localhost:3000/profiles/:profileId

// GET localhost:3000/profiles/:profileId/edit

/* 
// GET localhost:3000/profiles/:profileId/comments/:commentId/edit*/

// POST localhost:3000/profiles

/* 
// POST localhost:3000/profiles/:profileId/comments*/

// DELETE localhost:3000/profiles/:profileId

// DELETE localhost:3000/profiles/:profileId

// PUT localhost:3000/profiles/:profileId (update)

// PUT localhost:3000/profiles/:profileId/comments/:commentId (update comment)



export {
  router
}