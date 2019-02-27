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
var User_1 = require("../models/User");
var request = require("request");
var mongoose = require("mongoose");
var UserController = (function () {
    function UserController() {
        this.router = express_1.Router();
        this.routes();
    }
    UserController.prototype.all = function (req, res) {
        User_1.User.find()
            .then(function (data) {
            return res.status(200).json({
                data: data
            });
        })
            .catch(function (error) {
            res.status(500).json({
                error: error
            });
            return error;
        });
    };
    UserController.prototype.one = function (req, res) {
        var username = req.params.username;
        User_1.User.findOne({
            username: username
        })
            .then(function (data) {
            res.status(200).json({
                data: data
            });
        })
            .catch(function (error) {
            res.status(500).json({
                error: error
            });
        });
    };
    UserController.prototype.updateAvatar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, MONGO_URI, query, updateQuery, data_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("router hit------->");
                        data = req.body;
                        if (!!data.userId) return [3, 1];
                        res.send({ 'message': 'userId not found' });
                        return [3, 10];
                    case 1:
                        console.log(mongoose.connection.db.databaseName);
                        if (!(mongoose.connection.db.databaseName == 'master')) return [3, 2];
                        return [3, 4];
                    case 2:
                        MONGO_URI = 'mongodb://localhost/master';
                        return [4, mongoose.connect(MONGO_URI || process.env.MONGODB_URI)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        query = { id: data.userId };
                        updateQuery = {
                            $set: {
                                'avatar': data.avatar ? data.avatar : '',
                            }
                        };
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 9, , 10]);
                        return [4, User_1.User.find(query)];
                    case 6:
                        data_1 = _a.sent();
                        if (!(data_1 && data_1.length > 0)) return [3, 8];
                        return [4, User_1.User.update(query, updateQuery)];
                    case 7:
                        data_1 = _a.sent();
                        res.send({ 'message': 'Avatar successfully updated' });
                        _a.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw new Error(err_1);
                    case 10: return [2];
                }
            });
        });
    };
    UserController.prototype.fetchAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var options, counter;
            var _this = this;
            return __generator(this, function (_a) {
                console.log("router hit");
                options = {
                    headers: {
                        'User-Agent': 'request'
                    },
                    json: true
                };
                counter = 0;
                request.get('https://jsonplaceholder.typicode.com/users', options, function (error, response, body) { return __awaiter(_this, void 0, void 0, function () {
                    var _i, body_1, item, user, data, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, body_1 = body;
                                _a.label = 1;
                            case 1:
                                if (!(_i < body_1.length)) return [3, 6];
                                item = body_1[_i];
                                user = new User_1.User({
                                    'id': item.id,
                                    'name': item.name,
                                    'username': item.username,
                                    'email': item.email,
                                    'avatar': ''
                                });
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4, user.save()];
                            case 3:
                                data = _a.sent();
                                if (data) {
                                    counter = counter + 1;
                                    console.log('One data saved');
                                }
                                else {
                                    console.log('Data not saved');
                                }
                                return [3, 5];
                            case 4:
                                error_1 = _a.sent();
                                console.log('error');
                                return [3, 5];
                            case 5:
                                _i++;
                                return [3, 1];
                            case 6:
                                console.log('Total data saved', counter);
                                res.send({ 'message': 'All users Fetched' });
                                return [2];
                        }
                    });
                }); });
                return [2];
            });
        });
    };
    UserController.prototype.routes = function () {
        this.router.get('/', this.all);
        this.router.post('/fetch-users', this.fetchAllUsers);
        this.router.get('/:username', this.one);
        this.router.post('/update-avatar', this.updateAvatar);
    };
    return UserController;
}());
exports.UserController = UserController;
