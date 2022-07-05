import { Router } from "express";
import { check } from "express-validator";
import {
	deleteNote,
	getNotes,
	newNote,
	updateNote,
} from "../controllers/notes";
import { validateJWT } from "../middlewares";

const router = Router();

router.use(validateJWT);

router.get("/", getNotes);
router.post(
	"/",
	[
		check("title", "Title is required").not().isEmpty(),
		check("description", "Description is required").not().isEmpty(),
		check("colorEntry", "ColorEntry is required").not().isEmpty(),
	],
	newNote
);
router.put(
	"/:idNote",
	[
		check("title", "Title is required").not().isEmpty(),
		check("description", "Description is required").not().isEmpty(),
		check("colorEntry", "ColorEntry is required").not().isEmpty(),
	],
	updateNote
);
router.delete("/:idNote", deleteNote);

export default router;
