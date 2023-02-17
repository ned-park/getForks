import bcrypt from "bcrypt";
import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, required: false },
  password: { type: String, select: false },
  repos: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repo",
      },
    ],
    required: true,
    default: [],
  },
});

// Helper method for validating user's password.
// UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     cb(err, isMatch)
//   })
// }

UserSchema.statics.signup = async function (username, password) {
  const exists = await User.findOne({ username });

  if (exists) {
    throw new Error("Username is taken");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await this.create({
    username,
    password: passwordHash
  });

  return user
};

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.email;
    delete returnedObject.password;
  },
});

UserSchema.plugin(mongooseUniqueValidator);
const User = mongoose.model("User", UserSchema);
export default User;
