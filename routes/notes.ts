import { Router } from "express";
import {
	deleteNote,
	getNotes,
	newNote,
	updateNote,
} from "../controllers/notes";

const router = Router();

router.get("/", getNotes);
router.post("/", newNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
