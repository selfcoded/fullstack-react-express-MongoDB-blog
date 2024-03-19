import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 30 },
    categories: { type: Array, required: true },
    frontend: { type: Array, required: false },
    backend: { type: Array, required: false },
    mobile_application: { type: Array, required: false },
    introduction: { type: String, required: true },
    imgUrl: { type: String, required: false },
    notes: { type: String, required: true },
    projectLink: { type: String, required: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model("project", ProjectSchema);
