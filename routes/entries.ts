import { Router } from "express";
import {
	deleteEntry,
	getEntries,
	newEntry,
	updateEntry,
} from "../controllers/entries";
import {validateJWT} from "../middlewares";

const router = Router();

router.use(validateJWT)

router.get("/", getEntries);
router.post("/", newEntry);
router.put("/:idEntry", updateEntry);
router.delete("/:idEntry", deleteEntry);

export default router;
