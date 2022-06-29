import { Request, Response } from "express";

const getNotes = (req: Request, res: Response) => {
	res.json({
		msg: "Get Notes",
	});
};

const newNote = (req: Request, res: Response) => {
	res.json({
		msg: "New Note",
	});
};

const updateNote = (req: Request, res: Response) => {
	res.json({
		msg: "Update Note",
	});
};

const deleteNote = (req: Request, res: Response) => {
	res.json({
		msg: "Delete Note",
	});
};

export { getNotes, newNote, updateNote, deleteNote };
