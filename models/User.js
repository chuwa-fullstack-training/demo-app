import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // permissions: {
    //   type: [String],
    //   enum: ["user", "admin"],
    //   default: ["user"],
    // },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (!this.avatar) {
    this.avatar = gravatar.url(this.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model("User", UserSchema);
