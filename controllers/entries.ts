import { Request, Response } from "express";

const getEntries = (req: Request, res: Response) => {
	res.json({
		msg: "Get entries",
	});
};

const newEntry = (req: Request, res: Response) => {
	res.json({
		msg: "New Entry",
	});
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
