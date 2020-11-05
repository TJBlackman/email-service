import { string } from 'joi';
import mongoose, { Schema, Model } from 'mongoose';
import { IOrganizationDocument } from '../types';
import { OrganizationModelRef, UserModelRef } from './types'

const sendGridAPISchema = new Schema<{
  email: string;
  password: string;
  apiKey: string;
}>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    password: true
  }
});

const UserSchema = new Schema<IOrganizationDocument>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    required: true
  },
  sendGridAPIKeys: {
    type: [sendGridAPISchema],
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: UserModelRef,
    required: true
  }
});


const OrganizationModel = mongoose.models[OrganizationModelRef] as Model<IOrganizationDocument> || mongoose.model<IOrganizationDocument>(OrganizationModelRef, UserSchema);

export default OrganizationModel;