"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const notes_1 = require("../controllers/notes");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.use(middlewares_1.validateJWT);
router.get("/", notes_1.getNotes);
router.post("/", [
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    (0, express_validator_1.check)("colorEntry", "ColorEntry is required").not().isEmpty(),
], notes_1.newNote);
router.put("/:idNote", [
    (0, express_validator_1.check)("title", "Title is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description is required").not().isEmpty(),
    (0, express_validator_1.check)("colorEntry", "ColorEntry is required").not().isEmpty(),
], notes_1.updateNote);
router.delete("/:idNote", notes_1.deleteNote);
exports.default = router;
//# sourceMappingURL=notes.js.map