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
router.put("/:idNote", updateNote);
router.delete("/:idNote", deleteNote);

export default router;
