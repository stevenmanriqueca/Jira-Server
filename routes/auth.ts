import { Router } from "express";
import { check } from "express-validator";
import { loginUser, registerUser, renewToken } from "../controllers/auth";
import { validateFields, validateJWT } from "../middlewares";

const router = Router();

router.post(
	"/",
	[
		//Middlewares
		check("email", "Email is required").isEmail(),
		check("password", "Password is required").not().isEmpty(),
		//Custom Middleware
		validateFields,
	],
	loginUser
);

router.post(
	"/register",
	[
		check("email", "Email is required").isEmail(),
		check("name", "Name is required").not().isEmpty(),
		check("password", "The password must have at least 5 characters").isLength({
			min: 5,
		}),
		validateFields,
	],
	registerUser
);

router.get("/renew", validateJWT, renewToken);

export default router;
