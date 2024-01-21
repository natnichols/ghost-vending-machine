import { mongoose } from 'mongoose'

const Schema = mongoose.Schema

const snackSchema = new Schema({
  name: String,
  inStock: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Snack = mongoose.model('Snack', snackSchema)

export {
  Snack
}