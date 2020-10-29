var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false }
});

// allows searching on email address
UserSchema.index({ email: 'text' });

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;