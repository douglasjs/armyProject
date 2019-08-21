'use strict';

const   mongoose = require('mongoose');
const   Schema = mongoose.Schema;
const   ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({

    firstName: String,
    lastName: String,
    sex: String,
    rank: String,
    startDate: Date,
    phone: String,
    email: String,
    superiorID: { type : ObjectId, default: null },
    superior: { type : String, default: '' },
    DS: { type : Number, default: 0 },
    image: { type : String, default: '' },
    subordinates: { type : Array, default: [] },
    modifyDate: { type : Date, default: Date.now }
},  {versionKey: false});

const User = mongoose.model('Registration', UserSchema);
module.exports = User;