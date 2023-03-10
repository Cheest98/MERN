import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import note from "../models/note";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note id");
    }
    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) {
      throw createHttpError(400, " Note must have a title");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParms {
  noteId: string;
}

interface updateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParms,
  unknown,
  updateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note id");
    }
    if (!newTitle) {
      throw createHttpError(400, " Note must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    note.title = newTitle;
    note.text = newText;

    const updateNote = await note.save();

    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async(req, res, next) =>{
  const noteId = req.params.noteIdl

  try{
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note id");
    }
    const note = await NoteModel.findById(noteId).exec();

    if (!note){
      throw createHttpError(404, "note not found0")
    }

    // await NoteModel.findByIdAndRemove(noteId);

    res.sendStatus(204)
  } catch(error){
    next(error);
  }
}
