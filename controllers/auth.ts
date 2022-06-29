import { Request, Response } from "express";
import { IUser } from "../models";
import { db } from "../database";
import bcrypt from "bcryptjs";
import User from "../models/User";

type Data = { message: string } | { _id: string; name: string } | IUser;

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
		res.json({
			_id: user.id,
			name: user.name,
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

		return res.status(201).json({
			newUser,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: "Please contact the administrator",
		});
	}
};

const renewToken = (req: Request, res: Response<Data>) => {
	res.json({
		message: "Renew Token",
	});
};

export { loginUser, registerUser, renewToken };
