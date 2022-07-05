"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post("/", [
    //Middlewares
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").not().isEmpty(),
    //Custom Middleware
    middlewares_1.validateFields,
], auth_1.loginUser);
router.post("/register", [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("password", "The password must have at least 5 characters").isLength({
        min: 5,
    }),
    middlewares_1.validateFields,
], auth_1.registerUser);
router.get("/renew", middlewares_1.validateJWT, auth_1.renewToken);
exports.default = router;
//# sourceMappingURL=auth.js.map