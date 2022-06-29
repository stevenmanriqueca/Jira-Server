import jwt from "jsonwebtoken";

export const generateJWT = (id: string, name: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const payload = { id, name };
		jwt.sign(
			payload,
			process.env.SECRET_KEY!,
			{ expiresIn: "10h" },
			(error, token) => {
				if (error) {
					console.log(error);
					reject("Failed to generate token");
				}
				resolve(token!);
			}
		);
	});
};
