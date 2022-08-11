import express, { Application } from "express";
import cors from "cors"
import userRoutes from "./routes/user";
import entriesRoutes from "./routes/entries";
import "dotenv/config";

const app: Application = express();

const whiteList = ["https://jira-app-st.vercel.app"]
//Cors
app.use(cors({ origin: whiteList }))
//Read and parse the body

app.use(express.static("public"))

app.use(express.json());

app.use("/jira/user", userRoutes);
app.use("/jira/entries", entriesRoutes);

app.get("*", (_req, res) => {
	res.sendFile(__dirname + "/public/index.html")
})

//Listen request
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
