import { Router } from "express";
import { check } from "express-validator";
import { addColumn, deleteColumnJira, loginUser, registerUser, renewToken } from "../controllers/user";
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

router.use(validateJWT)
router.get("/renew", renewToken);

//Add and delete Columns Jira
router.post("/deleteColumn/:id", deleteColumnJira);
router.post("/addColumn/:id", addColumn);

export default router;
