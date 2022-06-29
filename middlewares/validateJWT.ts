import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//interface to know the properties of the token payload
interface JwtPayload {
	_id: string;
	name: string;
}

//Interface to help add custom prop in the request
declare module "express-serve-static-core" {
	interface Request {
		id: string;
		name: string;
	}
}

export const validateJWT = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "There is no token in the request",
		});
	}

	try {
		const { _id, name } = jwt.verify(
			token,
			process.env.SECRET_KEY!
		) as JwtPayload;

		//Add custom property to request
		req.id = _id;
		req.name = name;
	} catch (err) {
		return res.status(401).json({
			ok: false,
			msg: "Token not valid",
		});
	}
	next();
};
