"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    id: {
        type: 'Number'
    },
    name: {
        type: 'String'
    },
    username: {
        type: 'String'
    },
    email: {
        type: 'String'
    },
    avatar: {
        type: 'String'
    }
});
exports.User = mongoose_1.model('User', UserSchema);
