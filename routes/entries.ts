import { Router } from "express";
import { check } from "express-validator";
import {
	deleteEntry,
	getEntries,
	newEntry,
	updateEntry,
} from "../controllers/entries";
import { validateJWT } from "../middlewares";

const router = Router();

router.use(validateJWT);

router.get("/", getEntries);
router.post(
	"/",
	[
		check("title", "Title is required").not().isEmpty(),
		check("description", "Description is required").not().isEmpty(),
		check("priority", "Priority is required").not().isEmpty(),
		check("colorEntry", "ColorEntry is required").not().isEmpty(),
		check("status", "status is required").not().isEmpty(),
	],
	newEntry
);
router.put(
	"/:idEntry",
	[
		check("title", "Title is required").not().isEmpty(),
		check("description", "Description is required").not().isEmpty(),
		check("priority", "Priority is required").not().isEmpty(),
		check("colorEntry", "ColorEntry is required").not().isEmpty(),
		check("status", "status is required").not().isEmpty(),
	],
	updateEntry
);
router.delete("/:idEntry", deleteEntry);

export default router;
