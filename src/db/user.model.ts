import mongoose, { Schema, Model } from 'mongoose';
import { IUserDocument, IUserBase } from '../types';
import { createHash } from "../utils/password-helpers";
import { OrganizationModelRef, UserModelRef } from './types'

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
  },
  organizations: {
    type: [Schema.Types.ObjectId],
    ref: OrganizationModelRef,
    required: true,
    default: []
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

const UserModel = mongoose.models[UserModelRef] as Model<IUserDocument> || mongoose.model<IUserDocument>(UserModelRef, UserSchema);

export default UserModel;