import mongoose, { Schema, Model } from 'mongoose';
import { IOrganizationDocument } from '../types';
import { createHash } from "../utils/password-helpers";

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false }
});

const UserModel = mongoose.models.Users as Model<IOrganizationDocument> || mongoose.model<IOrganizationDocument>('Users', UserSchema);

export default UserModel;