import mongoose, { Model, Schema } from "mongoose";

export interface INote {
	id: string;
	title: string;
	description: string;
	colorEntry: string;
}

const noteSchema = new Schema({
	title: { type: String, requiered: true },
	description: { type: String, required: true },
	colorEntry: { type: String, required: false },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const NoteModel: Model<INote> =
	mongoose.models.Note || mongoose.model("Note", noteSchema);

export default NoteModel
