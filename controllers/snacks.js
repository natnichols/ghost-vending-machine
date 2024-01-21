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
  Snack.findById(req.params.snackId).populate([
    {path: 'owner'},
    {path: 'comments.author'}
  ]).then(snack => {
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
      .catch(err => {
        console.log(`🚨💥🖍️`, err)
        res.redirect('/snacks')
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

function deleteSnack(req, res) {
  Snack.findById(req.params.snackId).then(snack => {
    if (snack.owner.equals(req.user.profile._id)) {
      snack.deleteOne().then(()=> {
        res.redirect('/snacks')
      })
      .catch(err => {
        console.log(`🚨💥🖍️`, err)
        res.redirect('/snacks')
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

function addComment(req, res) {
  //find snack by id
  Snack.findById(req.params.snackId).then(snack => {
    //attach the authors profile_id to req.body.author
    req.body.author = req.user.profile._id
    //add new comment (req.body) to snack's comments array
    snack.comments.push(req.body)
    //save the snack
    snack.save().then(()=> {
      //redirect to snack show view
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

function editComment(req, res) {
  //find snack by id
  Snack.findById(req.params.snackId).then(snack => {
    //find the comment by id
    const comment = snack.comments.id(req.params.commentId)
    //check that the user editing the comment is the author
    if (comment.author.equals(req.user.profile._id)) {
      //render editComment view
      res.render('snacks/editComment', {
        snack,
        comment,
        title: 'Update Comment'
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

function updateComment(req, res) {
  //find snack by ID
  Snack.findById(req.params.snackId).then(snack => {
    //find comment by ID
    const comment = snack.comments.id(req.params.commentId)
    //check that user trying to delete is the comment author
    if (comment.author.equals(req.user.profile._id)) {
      //update comment content using comment.set(req.body)
      comment.set(req.body)
      //save the parent snack document
      snack.save().then(()=> {
        //redirect to the snack show page
        res.redirect(`/snacks/${snack._id}`)
      })
      .catch(err => {
        console.log(`🚨💥🖍️`, err)
        res.redirect('/snacks')
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

function deleteComment(req, res) {
  //find snack by ID
  Snack.findById(req.params.snackId).then(snack => {
    //find comment by ID
    const comment = snack.comments.id(req.params.commentId)
    //check that user trying to delete is the comment author
    if (comment.author.equals(req.user.profile._id)) {
      //delete the comment from the comments array with snack.comments.remove(comment)
      snack.comments.remove(comment)
      //save snack doc
      snack.save().then(()=> {
        //redirect back to the snack show page
        res.redirect(`/snacks/${snack._id}`)
      })
      .catch(err => {
        console.log(`🚨💥🖍️`, err)
        res.redirect('/snacks')
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
  deleteSnack as delete,
  addComment,
  editComment,
  updateComment,
  deleteComment,
}