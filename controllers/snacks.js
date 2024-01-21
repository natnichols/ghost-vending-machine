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

export {
  index,
}