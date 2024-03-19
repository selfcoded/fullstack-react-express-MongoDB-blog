import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 30 },
    categories: { type: Array, required: true },
    frontend: { type: Array, required: false },
    backend: { type: Array, required: false },
    mobile_application: { type: Array, required: false },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

export const Note = mongoose.model("note", NoteSchema);
