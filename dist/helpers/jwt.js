"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { id, name };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: "10h" }, (error, token) => {
            if (error) {
                console.log(error);
                reject("Failed to generate token");
            }
            resolve(token);
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=jwt.js.map