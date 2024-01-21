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
    res.redirect('/snacks')
  })
}

function show(req, res) {
  Snack.findById(req.params.snackId).populate('owner').then(snack => {
    res.render('snacks/show', {
      snack,
      title: `🍫 show`
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/snacks')
  })
}

function flipStock(req, res) {
  Snack.findById(req.params.snackId).then(snack => {
    snack.inStock = !snack.inStock
    snack.save().then(()=> {
      res.redirect(`/snacks/${snack._id}`)
    })
    .catch(err => {
      console.log(`🚨💥🖍️`, err)
      res.redirect('/snacks')
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/snacks')
  })
}

function edit(req, res) {
  Snack.findById(req.params.snackId).then(snack => {
    res.render('snacks/edit', {
      snack,
      title: 'edit ✏️🍫'
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/snacks')
  })
}

function update(req, res) {
  Snack.findById(req.params.snackId).then(snack => {
    if (snack.owner.equals(req.user.profile._id)) {
      req.body.inStock = !! req.body.inStock
      snack.updateOne(req.body).then(()=> {
        res.redirect(`/snacks/${snack._id}`)
      })
    } else {
      throw new Error ('🚫🍫 Not authorized 😡🛑')
    }
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/snacks')
  })
}

export {
  index,
  create,
  show,
  flipStock,
  edit,
  update,
}