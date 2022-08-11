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
exports.deleteEntry = exports.updateEntry = exports.newEntry = exports.getEntries = void 0;
const database_1 = require("../database");
const models_1 = require("../models");
const getEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.db.connect();
    const entries = yield models_1.Entry.find({ user: { _id: req.id } });
    yield database_1.db.disconnect();
    return res.status(200).json(entries);
});
exports.getEntries = getEntries;
const newEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newEntryUser = new models_1.Entry(Object.assign(Object.assign({}, req.body), { createdAt: Date.now() }));
    try {
        newEntryUser.user = req.id;
        yield database_1.db.connect();
        const entrySave = yield newEntryUser.save();
        yield database_1.db.disconnect();
        return res.status(201).json(entrySave);
    }
    catch (err) {
        yield database_1.db.disconnect();
        console.log(err);
        return res
            .status(500)
            .json({ message: "Please contact the administrator" });
    }
});
exports.newEntry = newEntry;
const updateEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEntry } = req.params;
    const idUser = req.id;
    try {
        yield database_1.db.connect();
        const entryDB = yield models_1.Entry.findById(idEntry);
        yield database_1.db.disconnect();
        if (!entryDB) {
            return res.status(404).json({
                message: "Entry not found",
            });
        }
        if (entryDB.user.toString() !== idUser) {
            return res.status(401).json({
                message: "You cannot modify this entry",
            });
        }
        const updatedEntry = Object.assign(Object.assign({}, req.body), { user: idUser });
        yield database_1.db.connect();
        const entryUpdated = yield models_1.Entry.findByIdAndUpdate(idEntry, updatedEntry, {
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
exports.updateEntry = updateEntry;
const deleteEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEntry } = req.params;
    const idUser = req.id;
    try {
        yield database_1.db.connect();
        const entryInDb = yield models_1.Entry.findById(idEntry);
        yield database_1.db.disconnect();
        if (!entryInDb) {
            return res.status(404).json({
                message: "Entry not found",
            });
        }
        if (entryInDb.user.toString() !== idUser) {
            return res.status(401).json({
                message: "You cannot modify this entry",
            });
        }
        yield database_1.db.connect();
        yield models_1.Entry.findByIdAndDelete(idEntry);
        yield database_1.db.disconnect();
        res.status(200).json({ message: "Entry deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Please contact the administrator",
        });
    }
});
exports.deleteEntry = deleteEntry;
//# sourceMappingURL=entries.js.map