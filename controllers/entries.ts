import { Request, Response } from "express";
import { db } from "../database";
import Entry, { IEntry } from "../models/Entry";

type Data = IEntry | IEntry[] | { message: string };

const getEntries = async (req: Request, res: Response<Data>) => {
	await db.connect();
	const entries = await Entry.find({ user: { _id: req.id } });
	await db.disconnect();
	return res.status(200).json(entries);
};

const newEntry = async (req: Request, res: Response<Data>) => {
	const newEntryUser: Record<string, any> = new Entry({
		...req.body,
		createdAt: Date.now(),
	});

	try {
		newEntryUser.user = req.id;
		await db.connect();
		const entrySave = await newEntryUser.save();
		await db.disconnect();
		return res.status(201).json(entrySave);
	} catch (err) {
		await db.disconnect();
		console.log(err);
		return res
			.status(500)
			.json({ message: "Please contact the administrator" });
	}
};

const updateEntry = async (req: Request, res: Response<Data>) => {
	const entryId = req.params.idEntry;
	const idUser = req.id;

	try {
		await db.connect();
		const entryDB: Record<string, any> | null = await Entry.findById(entryId);
		await db.disconnect();
		if (!entryDB) {
			return res.status(404).json({
				message: "Entry not found",
			});
		}
		if (entryDB.user.toString() !== idUser) {
			return res.status(401).json({
				message: "You cannot modify this entry",
			});
		}

		const updatedEntry = {
			...req.body,
			user: idUser,
		};

		await db.connect();
		const entryUpdated = await Entry.findByIdAndUpdate(entryId, updatedEntry, {
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

const deleteEntry = async (req: Request, res: Response<Data>) => {
	const idEntry = req.params.idEntry;
	const idUser = req.id;

	try {
		await db.connect()
		const entryInDb: Record<string, any> | null = await Entry.findById(idEntry);
		await db.disconnect()
		if (!entryInDb) {
			return res.status(404).json({
				message: "Entry not found",
			});
		}

		if (entryInDb.user.toString() !== idUser) {
			return res.status(401).json({
				message: "You cannot modify this entry",
			});
		}

		await db.connect()
		await Entry.findByIdAndDelete(idEntry);
		await db.disconnect()

		res.status(200).json({ message: "Entry deleted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

export { getEntries, newEntry, updateEntry, deleteEntry };
