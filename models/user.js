const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    accessToken: { type: String, default: '' },
    userId: { type: Number, default: '' },
    expiresAt: { type: Number, default: ''},
    created: { type: Number, default: Date.now() }
});


module.exports = mongoose.model('User', UserSchema);