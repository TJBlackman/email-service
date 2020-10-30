import mongoose, { Schema, Model } from 'mongoose';
import { IUserDocument, IUserBase } from '../types';
import { createHash } from "../utils/password-helpers";

const UserSchema = new Schema<IUserBase>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

// allows searching on email address
UserSchema.index({ email: 'text' });

// Document middlewares
UserSchema.pre<IUserDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await createHash(this.password);
  }
});

const userModelKey = 'Users';
const UserModel = mongoose.models[userModelKey] as Model<IUserDocument> || mongoose.model<IUserDocument>(userModelKey, UserSchema);

export default UserModel;