import mongoose, { Model, Schema } from "mongoose";

export interface IEntry {
	id: string;
	title: string;
	description: string;
	priority: string;
	userTags: IUserTags[];
	createdAt: number;
	position?: number;
	status: string;
}
interface IUserTags {
	id: string;
	title: string;
}
const tagsSchema = new Schema({ title: { type: String } });
const entrySchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	priority: { type: String, required: true },
	userTags: [tagsSchema],
	createdAt: { type: Number },
	position: { type: Number },
	status: { type: String, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const EntryModel: Model<IEntry> =
	mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
