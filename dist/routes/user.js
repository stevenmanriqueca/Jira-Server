"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = require("../controllers/user");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post("/", [
    //Middlewares
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").not().isEmpty(),
    //Custom Middleware
    middlewares_1.validateFields,
], user_1.loginUser);
router.post("/register", [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("password", "The password must have at least 5 characters").isLength({
        min: 5,
    }),
    middlewares_1.validateFields,
], user_1.registerUser);
router.use(middlewares_1.validateJWT);
router.get("/renew", user_1.renewToken);
//Add and delete Columns Jira
router.post("/deleteColumn/:id", user_1.deleteColumnJira);
router.post("/addColumn/:id", user_1.addColumn);
exports.default = router;
//# sourceMappingURL=user.js.map