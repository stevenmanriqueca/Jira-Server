import { Router } from "express";
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
router.post("/", newNote);
router.put("/:idNote", updateNote);
router.delete("/:idNote", deleteNote);

export default router;
