import { Router } from "express";
import {
	deleteEntry,
	getEntries,
	newEntry,
	updateEntry,
} from "../controllers/entries";

const router = Router();

router.get("/", getEntries);
router.post("/", newEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
