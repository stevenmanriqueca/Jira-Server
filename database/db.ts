import mongoose from "mongoose";

export const connect = async() => {
	try {
		await mongoose.connect(process.env.MONGO_DB_CONNECTION || "");
		//console.log("Connected")
	} catch (err) {
		console.log(err);
		throw new Error("Error to initialize BD");
	} 
};

export const disconnect = async() => {
	await mongoose.disconnect()
}

