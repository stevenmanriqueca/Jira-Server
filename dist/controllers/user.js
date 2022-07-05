"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addColumn = exports.deleteColumnJira = exports.renewToken = exports.registerUser = exports.loginUser = void 0;
const database_1 = require("../database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const jwt_1 = require("../helpers/jwt");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        yield database_1.db.connect();
        const user = yield models_1.User.findOne({ email });
        yield database_1.db.disconnect();
        if (!user) {
            return res.status(400).json({
                message: "There is no user with that email",
            });
        }
        //Confirm passwords
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Password Incorrect",
            });
        }
        //Generate token
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        return res.json({
            id: user.id,
            name: user.name,
            token,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Please contact the administrator",
        });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        yield database_1.db.connect();
        const verifyExistUser = yield models_1.User.findOne({ email });
        if (verifyExistUser) {
            return res.status(400).json({
                message: "There is already a user with this email",
            });
        }
        const newUser = new models_1.User(req.body);
        //Encrypt Password
        const salt = bcryptjs_1.default.genSaltSync(12);
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        yield newUser.save();
        yield database_1.db.disconnect();
        const token = yield (0, jwt_1.generateJWT)(newUser.id, newUser.name);
        return res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            columnsJira: newUser.columnsJira,
            token,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Please contact the administrator",
        });
    }
});
exports.registerUser = registerUser;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req;
    const token = yield (0, jwt_1.generateJWT)(id, name);
    return res.json({
        message: "renew",
        token,
    });
});
exports.renewToken = renewToken;
const deleteColumnJira = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameColumn } = req.body;
    const idUser = req.params.id;
    try {
        yield database_1.db.connect();
        const user = yield models_1.User.findById(idUser);
        if (user) {
            const updateColumnsUser = user.columnsJira.filter((columns) => columns !== nameColumn);
            (user.columnsJira = updateColumnsUser),
                yield models_1.User.findByIdAndUpdate(idUser, user, { new: true });
            return res.status(201).json({
                message: "Update Columns User",
            });
        }
        yield database_1.db.disconnect();
        return res.status(400).json({
            message: "Not user found",
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Please contact the administrator",
        });
    }
});
exports.deleteColumnJira = deleteColumnJira;
const addColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newColumns } = req.body;
    const idUser = req.params.id;
    try {
        yield database_1.db.connect();
        const user = yield models_1.User.findById(idUser);
        if (user) {
            user.columnsJira = user.columnsJira.concat(newColumns);
            yield models_1.User.findByIdAndUpdate(idUser, user, { new: true });
            return res.status(201).json({
                message: "Added Columns",
            });
        }
        yield database_1.db.disconnect();
        return res.status(400).json({
            message: "Not user found",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Please contact the administrator",
        });
    }
});
exports.addColumn = addColumn;
//# sourceMappingURL=user.js.map