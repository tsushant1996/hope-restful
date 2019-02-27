"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Post_1 = require("../models/Post");
var rp = require("request-promise");
var mongoose = require("mongoose");
var PostController = (function () {
    function PostController() {
        this.router = express_1.Router();
        this.routes();
    }
    PostController.prototype.all = function (_, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, MONGO_URI, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4, mongoose.connection.close()];
                    case 1:
                        _a.sent();
                        userId = _.body.userId;
                        MONGO_URI = 'mongodb://localhost/user_' + userId;
                        return [4, mongoose.connect(MONGO_URI || process.env.MONGODB_URI)];
                    case 2:
                        _a.sent();
                        return [4, Post_1.Post.find()];
                    case 3:
                        data = _a.sent();
                        return [4, mongoose.connection.close()];
                    case 4:
                        _a.sent();
                        return [2, res.status(200).json({
                                data: data,
                                message: 'success'
                            })];
                    case 5:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    PostController.prototype.fetchPosts = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var counter, options, posts, _i, posts_1, item, comments, MONGO_URI, postData, userData, error_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counter = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 14, , 15]);
                        options = {
                            headers: {
                                'User-Agent': 'request'
                            },
                            json: true
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 12, , 13]);
                        return [4, rp.get('https://jsonplaceholder.typicode.com/posts', options)];
                    case 3:
                        posts = _a.sent();
                        _i = 0, posts_1 = posts;
                        _a.label = 4;
                    case 4:
                        if (!(_i < posts_1.length)) return [3, 11];
                        item = posts_1[_i];
                        return [4, mongoose.connection.close()];
                    case 5:
                        _a.sent();
                        return [4, rp.get("https://jsonplaceholder.typicode.com/comments?postId=" + item.id, options)];
                    case 6:
                        comments = _a.sent();
                        console.log("========>");
                        MONGO_URI = 'mongodb://localhost/user_' + item.userId;
                        return [4, mongoose.connect(MONGO_URI || process.env.MONGODB_URI)];
                    case 7:
                        _a.sent();
                        postData = new Post_1.Post({
                            'userId': item.userId,
                            'id': item.id,
                            'body': item.body,
                            'title': item.title,
                            'comments': comments
                        });
                        return [4, postData.save()];
                    case 8:
                        userData = _a.sent();
                        return [4, mongoose.connection.close()];
                    case 9:
                        _a.sent();
                        if (userData) {
                            counter = counter + 1;
                            console.log("data saved");
                        }
                        res.send({ 'message': counter + " records saved" });
                        _a.label = 10;
                    case 10:
                        _i++;
                        return [3, 4];
                    case 11: return [3, 13];
                    case 12:
                        error_2 = _a.sent();
                        res.send(error_2);
                        return [3, 13];
                    case 13: return [3, 15];
                    case 14:
                        error_3 = _a.sent();
                        return [2, next(error_3.message)];
                    case 15: return [2];
                }
            });
        });
    };
    PostController.prototype.routes = function () {
        this.router.post('/get-user-post', this.all);
        this.router.post('/fetch-posts', this.fetchPosts);
    };
    return PostController;
}());
exports.PostController = PostController;
