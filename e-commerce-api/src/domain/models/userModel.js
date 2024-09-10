const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    role: { type: Schema.Types.ObjectId, ref: "Role" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);