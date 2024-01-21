import { Snack } from '../models/snack.js'

function index(req, res) {
  Snack.find({}).then(snacks => {
    res.render('snacks/index', {
      snacks,
      title: '🍫'
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.inStock = !!req.body.inStock
  Snack.create(req.body).then(snack => {
    res.redirect('/snacks')
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/')
  })
}

export {
  index,
  create,
}