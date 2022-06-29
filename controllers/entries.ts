import { Request, Response } from "express";
import { db } from "../database";
import Entry, { IEntry } from "../models/Entry";

type Data = IEntry | { message: string };

const getEntries = async (req: Request, res: Response) => {
	const entries = await Entry.find().populate("User", "id");
	res.json({
		msg: entries,
	});
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

const updateEntry = (req: Request, res: Response) => {
	res.json({
		msg: "Update Entry",
	});
};

const deleteEntry = (req: Request, res: Response) => {
	res.json({
		msg: "Delete Entry",
	});
};

export { getEntries, newEntry, updateEntry, deleteEntry };
