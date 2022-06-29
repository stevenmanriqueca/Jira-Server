import { Request, Response } from "express";
import { db } from "../database";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import { generateJWT } from "../helpers/jwt";

type Data =
	| { message: string }
	| { id: string; name: string; token: string }
	| IUser;

const loginUser = async (req: Request, res: Response<Data>) => {
	const { email, password } = req.body;

	try {
		await db.connect();
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				message: "There is no user with that email",
			});
		}
		await db.disconnect();

		//Confirm passwords
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				message: "Password Incorrect",
			});
		}

		//Generate token
		const token = await generateJWT(user.id, user.name);
		res.json({
			id: user.id,
			name: user.name,
			token,
		});
	} catch (err) {
		res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

const registerUser = async (req: Request, res: Response) => {
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
		res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

const renewToken = async (req: Request, res: Response<Data>) => {
	const { id, name } = req;
	const token = await generateJWT(id, name);

	res.json({
		message: "renew",
		token,
	});
};

export { loginUser, registerUser, renewToken };
