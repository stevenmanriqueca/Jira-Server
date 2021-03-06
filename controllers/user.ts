import { Request, Response } from "express";
import { db } from "../database";
import bcrypt from "bcryptjs";
import { User, IUser, Entry } from "../models";
import { generateJWT } from "../helpers/jwt";

interface IUserWithToken extends IUser {
	token: string;
}

type Data =
	| { message: string }
	| { id: string; name: string; token: string; columnsJira: string[] }
	| IUser
	| IUserWithToken;

const loginUser = async (req: Request, res: Response<Data>) => {
	const { email, password } = req.body;

	try {
		await db.connect();
		const user = await User.findOne({ email });
		await db.disconnect();
		if (!user) {
			return res.status(400).json({
				message: "There is no user with that email",
			});
		}

		//Confirm passwords
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				message: "Password Incorrect",
			});
		}

		//Generate token
		const token = await generateJWT(user.id, user.name);
		return res.json({
			id: user.id,
			name: user.name,
			columnsJira: user.columnsJira,
			token,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

const registerUser = async (req: Request, res: Response<Data>) => {
	const { email, password } = req.body;

	try {
		await db.connect();
		const verifyExistUser = await User.findOne({ email });
		if (verifyExistUser) {
			return res.status(400).json({
				message: "There is already a user with this email",
			});
		}

		const newUser = new User(req.body);

		//Encrypt Password
		const salt = bcrypt.genSaltSync(12);
		newUser.password = bcrypt.hashSync(password, salt);

		await newUser.save();

		await db.disconnect();

		const token = await generateJWT(newUser.id, newUser.name);

		return res.status(201).json({
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			columnsJira: newUser.columnsJira,
			token,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

const renewToken = async (req: Request, res: Response<Data>) => {

	const { id, name } = req;

	await db.connect()
	const user = await User.findById(id)
	await db.disconnect()
	const token = await generateJWT(id, name);

	if (!user || !token) {
		return res.status(400).json({
			message: "Error renewToken"
		})
	}

	return res.json({
		id: user.id,
		name: user.name,
		columnsJira: user.columnsJira,
		token,
	});
};

const deleteColumnJira = async (req: Request, res: Response<Data>) => {
	const { nameColumn } = req.body;
	const idUser = req.params.id;
	try {
		await db.connect();
		const user: IUser | null = await User.findById(idUser);
		if (user) {
			const updateColumnsUser = user.columnsJira.filter(
				(columns) => columns !== nameColumn
			);
			user.columnsJira = updateColumnsUser
			await Entry.deleteMany({ "status": `${nameColumn}` })
			await User.findByIdAndUpdate(idUser, user, { new: true });
			return res.status(201).json({
				message: "Update Columns User",
			});
		}

		await db.disconnect();
		return res.status(400).json({
			message: "Not user found",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

const addColumn = async (req: Request, res: Response<Data>) => {
	const { newColumns } = req.body;
	const idUser = req.params.id;

	try {
		await db.connect();
		const user: IUser | null = await User.findById(idUser);
		if (user) {
			user.columnsJira = user.columnsJira.concat(newColumns);
			await User.findByIdAndUpdate(idUser, user, { new: true });
			return res.status(201).json({
				message: "Added Columns",
			});
		}
		await db.disconnect();
		return res.status(400).json({
			message: "Not user found",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

export { loginUser, registerUser, renewToken, deleteColumnJira, addColumn };
