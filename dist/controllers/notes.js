"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.newNote = exports.getNotes = void 0;
const database_1 = require("../database");
const models_1 = require("../models/");
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.connect();
    const notes = yield models_1.Note.find({ user: { _id: req.id } });
    yield database_1.db.disconnect();
    return res.status(200).json(notes);
});
exports.getNotes = getNotes;
const newNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newNoteUser = new models_1.Note(Object.assign(Object.assign({}, req.body), { user: req.id }));
    try {
        yield database_1.db.connect();
        const noteSave = yield newNoteUser.save();
        yield database_1.db.disconnect();
        return res.status(201).json(noteSave);
    }
    catch (err) {
        yield database_1.db.disconnect();
        console.log(err);
        return res
            .status(500)
            .json({ message: "Please contact the administrator" });
    }
});
exports.newNote = newNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idNote } = req.params;
    const idUser = req.id;
    try {
        yield database_1.db.connect();
        const noteDB = yield models_1.Note.findById(idNote);
        yield database_1.db.disconnect();
        if (!noteDB) {
            return res.status(404).json({
                message: "Note not found",
            });
        }
        if (noteDB.user.toString() !== idUser) {
            return res.status(401).json({
                message: "You cannot modify this note",
            });
        }
        const updatedEntry = Object.assign(Object.assign({}, req.body), { user: idUser });
        yield database_1.db.connect();
        const entryUpdated = yield models_1.Note.findByIdAndUpdate(idNote, updatedEntry, {
            new: true,
        });
        yield database_1.db.disconnect();
        return res.status(201).json(entryUpdated);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ message: "Please contact the administrator" });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idNote } = req.params;
    const idUser = req.id;
    try {
        yield database_1.db.connect();
        const entryInDb = yield models_1.Note.findById(idNote);
        yield database_1.db.disconnect();
        if (!entryInDb) {
            return res.status(404).json({
                message: "Entry not Note",
            });
        }
        if (entryInDb.user.toString() !== idUser) {
            return res.status(401).json({
                message: "You cannot modify this Note",
            });
        }
        yield database_1.db.connect();
        yield models_1.Note.findByIdAndDelete(idNote);
        yield database_1.db.disconnect();
        res.status(200).json({ message: "Note deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Please contact the administrator",
        });
    }
});
exports.deleteNote = deleteNote;
//# sourceMappingURL=notes.js.map