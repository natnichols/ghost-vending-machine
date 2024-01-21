import { mongoose } from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const snackSchema = new Schema({
  name: String,
  inStock: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  comments: [commentSchema]
}, {
  timestamps: true
})

const Snack = mongoose.model('Snack', snackSchema)

export {
  Snack
}