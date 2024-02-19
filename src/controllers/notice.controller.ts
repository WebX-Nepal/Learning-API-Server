import { Router, Request, Response } from "express";
import noticeModel from "../database/schema/notice.schema";
import multer from "multer";
import upload from "../../middlewares/multer";
import dotenv from "dotenv";
import cloudinary from "../../config/cloudinaryConfig";
import { uploadSingleFile } from "../../middlewares/uploadSingleFile";
import { authenticateToken } from "../../middlewares/authenticateToken";
dotenv.config();
const controller = Router();

controller

  .post("/",authenticateToken, upload.single("image"), async (req: any, res) => {
    try {
      const image = req.file;
      const imageUrl = await uploadSingleFile(image);

      const newItem = new noticeModel({ ...req.body, image: imageUrl });
      const savedItem = await newItem.save();

      res.status(201).json({
        msg: "Create success",
        success: true,
        file_upload: imageUrl && "ok",
        data: savedItem,
      });
    } catch (error: any) {
      if (error instanceof multer.MulterError) {
        // Handle Multer errors
        res.status(400).json({
          success: false,
          message: "Invalid file uploaded",
          error: error.message,
        });
      } else if (error.name === "ValidationError") {
        // Handle validation errors
        res.status(400).json({
          success: false,
          message: "Validation error occurred",
          error: error.message,
        });
      } else {
        // Handle all other errors
        res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error.message,
        });
      }
    }
  })

  .get("/", async (req: Request, res: Response) => {
    try {
      const items = await noticeModel.find();
      return res.status(200).json({ success: true, msg: "Get success", data: items });
    } catch (error: any) {
      return res.status(500).json({
        msg: "Something went wrong",
        success: false,
        error: error.message,
      });
    }
  })

  .get("/:id", async (req: Request, res: Response) => {
    try {
      const item = await noticeModel.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, msg: "Item not found" });
      }

      return res.status(200).json({ success: true, msg: "Get success", data: item });
    } catch (error: any) {
      return res.status(500).json({
        msg: "Something went wrong",
        success: false,
        error: error.message,
      });
    }
  })

  .delete("/:id",authenticateToken, async (req, res) => {
    try {
      const item = await noticeModel.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, msg: "Item not found" });
      }

      const imageUrl: any = item.image;
      const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

      let result;
      try {
        result = await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        return res.status(500).json({
          success: false,
          msg: "Something went wrong while deleting image from Cloudinary",
        });
      }

      const deletedItem = await noticeModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        msg: "Deleted success",
        file_delete: result.result,
        data: deletedItem,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong",
      });
    }
  });

export default controller;
