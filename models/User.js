import bcrypt from "bcrypt"
import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type:String, required: false },
  password: { type: String, select: false },
  repos: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repo'
      }
    ],
    required: true,
    default: []
  }
})

// Password hash middleware.
 
//  UserSchema.pre('save', function save(next) {
//   const user = this
//   if (!user.isModified('password')) { return next() }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err) }
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) { return next(err) }
//       user.password = hash
//       next()
//     })
//   })
// })

// Helper method for validating user's password.
// UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     cb(err, isMatch)
//   })
// }

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.email
    delete returnedObject.password
  }
})


UserSchema.plugin(mongooseUniqueValidator)
const User = mongoose.model('User', UserSchema)
export default User
