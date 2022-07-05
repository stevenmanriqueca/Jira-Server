import { Request, Response } from "express";
import { db } from "../database";
import { Note, INote } from "../models/";

type Data = INote | INote[] | { message: string };

const getNotes = async (req: Request, res: Response<Data>) => {
	await db.connect();
	const notes = await Note.find({ user: { _id: req.id } });
	await db.disconnect();
	return res.status(200).json(notes);
};

const newNote = async (req: Request, res: Response<Data>) => {
	const newNoteUser = new Note({
		...req.body,
		user: req.id,
	});

	try {
		await db.connect();
		const noteSave = await newNoteUser.save();
		await db.disconnect();
		return res.status(201).json(noteSave);
	} catch (err) {
		await db.disconnect();
		console.log(err);
		return res
			.status(500)
			.json({ message: "Please contact the administrator" });
	}
};

const updateNote = async (req: Request, res: Response<Data>) => {
	const { idNote } = req.params;
	const idUser = req.id;

	try {
		await db.connect();
		const noteDB: Record<string, any> | null = await Note.findById(idNote);
		await db.disconnect();
		if (!noteDB) {
			return res.status(404).json({
				message: "Note not found",
			});
		}
		if (noteDB.user.toString() !== idUser) {
			return res.status(401).json({
				message: "You cannot modify this note",
			});
		}

		const updatedEntry = {
			...req.body,
			user: idUser,
		};

		await db.connect();
		const entryUpdated = await Note.findByIdAndUpdate(idNote, updatedEntry, {
			new: true,
		});
		await db.disconnect();

		return res.status(201).json(entryUpdated!);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "Please contact the administrator" });
	}
};

const deleteNote = async (req: Request, res: Response<Data>) => {
	const { idNote } = req.params;
	const idUser = req.id;

	try {
		await db.connect();
		const entryInDb: Record<string, any> | null = await Note.findById(idNote);
		await db.disconnect();
		if (!entryInDb) {
			return res.status(404).json({
				message: "Entry not Note",
			});
		}

		if (entryInDb.user.toString() !== idUser) {
			return res.status(401).json({
				message: "You cannot modify this Note",
			});
		}

		await db.connect();
		await Note.findByIdAndDelete(idNote);
		await db.disconnect();

		res.status(200).json({ message: "Note deleted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

export { getNotes, newNote, updateNote, deleteNote };
