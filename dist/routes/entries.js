"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const entries_1 = require("../controllers/entries");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.use(middlewares_1.validateJWT);
router.get("/", entries_1.getEntries);
router.post("/", [
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    (0, express_validator_1.check)("priority", "Priority is required").not().isEmpty(),
    (0, express_validator_1.check)("status", "status is required").not().isEmpty(),
], entries_1.newEntry);
router.put("/:idEntry", [
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    (0, express_validator_1.check)("priority", "Priority is required").not().isEmpty(),
    (0, express_validator_1.check)("status", "status is required").not().isEmpty(),
], entries_1.updateEntry);
router.delete("/:idEntry", entries_1.deleteEntry);
exports.default = router;
//# sourceMappingURL=entries.js.map