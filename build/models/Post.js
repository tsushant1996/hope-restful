"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    userId: {
        type: 'Number'
    },
    id: {
        type: 'Number'
    },
    title: {
        type: 'String'
    },
    body: {
        type: 'String'
    },
    comments: []
});
exports.Post = mongoose_1.model('Post', PostSchema);
