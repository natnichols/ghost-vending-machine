import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ghostSchema = new Schema({
  name: String,
  money: Number,
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  ghosts: [ghostSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
