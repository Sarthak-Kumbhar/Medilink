import mongoose from "mongoose"
import bcrypt from "bcrypt"
import SendError from "../utility/Error.handlers.js"

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId
      },
    },
    googleId: {
      type: String,
      required: function () {
        return !this.password
      },
    },
    name: String,
    avatar: String,
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err) {
    next(new SendError("Error hashing password", 500))
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) throw new SendError("No password set", 400)

  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  if (!isMatch) throw new SendError("Invalid credentials", 401)

  return true
}

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User
