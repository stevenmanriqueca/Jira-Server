"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "There is no token in the request",
        });
    }
    try {
        const { id, name } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        //Add custom property to request
        req.id = id;
        req.name = name;
    }
    catch (err) {
        return res.status(401).json({
            ok: false,
            msg: "Token not valid",
        });
    }
    next();
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map