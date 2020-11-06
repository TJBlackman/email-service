import mongoose, { Schema, Model } from 'mongoose';
import { IOrganizationDocument, IProviderCredentials } from '../types';
import { OrganizationModelRef, UserModelRef } from './types'

const ProviderCredentialsSchema = new Schema<IProviderCredentials>({
  providerName: {
    type: String,
    required: true
  },
  providerEmail: String,
  providerPassword: String,
  providerAPIKey: {
    type: String,
    password: true
  }
});

const OrganizationSchema = new Schema<IOrganizationDocument>({
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
  providerCredentials: {
    type: [ProviderCredentialsSchema],
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: UserModelRef,
    required: true
  }
});


const OrganizationModel = mongoose.models[OrganizationModelRef] as Model<IOrganizationDocument> || mongoose.model<IOrganizationDocument>(OrganizationModelRef, OrganizationSchema);

export default OrganizationModel;