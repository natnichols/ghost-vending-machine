import { Router } from 'express'
import * as snacksCtrl from '../controllers/snacks.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/snacks
router.get('/', snacksCtrl.index)
/* 
// GET localhost:3000/snacks/new*/
// GET localhost:3000/snacks/:snackId
router.get('/:snackId', snacksCtrl.show)
// GET localhost:3000/snacks/:snackId/edit
router.get('/:snackId/edit', isLoggedIn, snacksCtrl.edit)
// GET localhost:3000/snacks/:snackId/comments/:commentId/edit

// POST localhost:3000/snacks
router.post('/', isLoggedIn, snacksCtrl.create)
// POST localhost:3000/snacks/:snackId/comments
router.post('/:snackId/comments', isLoggedIn, snacksCtrl.addComment)
// DELETE localhost:3000/snacks/:snackId
router.delete('/:snackId', isLoggedIn, snacksCtrl.delete)
// DELETE localhost:3000/snacks/:snackId (delete comment)

// PUT localhost:3000/snacks/:snackId (update)
router.put('/:snackId', isLoggedIn, snacksCtrl.update)
// PUT localhost:3000/snacks/:snackId/comments/:commentId (update)

// PATCH localhost:3000/snacks/:snackId/flip-stock
router.patch('/:snackId/flip-stock', isLoggedIn, snacksCtrl.flipStock)

export {
  router
}