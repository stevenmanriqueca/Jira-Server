import express, { Application } from "express";
import authRoutes from "./routes/auth";
import entriesRoutes from "./routes/entries";
import notesRouter from "./routes/notes";
import "dotenv/config";

const app: Application = express();

//Read and parse the body
app.use(express.json());

app.use("/jira/auth", authRoutes);
app.use("/jira/entries", entriesRoutes);
app.use("/jira/notes", notesRouter);

//Listen request
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
