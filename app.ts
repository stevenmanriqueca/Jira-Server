import express, { Application } from "express";
import cors from "cors"
import userRoutes from "./routes/user";
import entriesRoutes from "./routes/entries";
import notesRouter from "./routes/notes";
import "dotenv/config";

const app: Application = express();

const whiteList = ["http://localhost:5173"]
//Cors
app.use(cors({ origin: whiteList }))
//Read and parse the body
app.use(express.json());

app.use("/jira/user", userRoutes);
app.use("/jira/entries", entriesRoutes);
app.use("/jira/notes", notesRouter);

//Listen request
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
