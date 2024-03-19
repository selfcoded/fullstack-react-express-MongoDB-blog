import express from "express";
import {
  contactController,
  sendContactController,
} from "../controllers/contact.js";

export const contactRouter = express.Router();
contactRouter.get("/", contactController);
contactRouter.post("/send_email", sendContactController);

export default { contactRouter };
