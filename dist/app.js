"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const entries_1 = __importDefault(require("./routes/entries"));
const notes_1 = __importDefault(require("./routes/notes"));
require("dotenv/config");
const app = (0, express_1.default)();
const whiteList = ["http://localhost:5173"];
//Cors
app.use((0, cors_1.default)({ origin: whiteList }));
//Read and parse the body
app.use(express_1.default.json());
app.use("/jira/user", user_1.default);
app.use("/jira/entries", entries_1.default);
app.use("/jira/notes", notes_1.default);
//Listen request
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map