import { Router, Request, Response } from "express";
import DoctorModel from "../database/schema/doctor.schema";
import multer from "multer";
import { uploadSingleFile } from "../../middlewares/uploadSingleFile";
import upload from "../../middlewares/multer";
import dotenv from "dotenv";
import cloudinary from "../../config/cloudinaryConfig";
import { authenticateToken } from "../../middlewares/authenticateToken";
import DoctorDepartmentModel from "../database/schema/doctorDepartment.schema";

dotenv.config();

const controller = Router();

controller

  .post("/", authenticateToken, upload.single("image"), async (req: any, res) => {
    try {
      const image = req.file;
      const imageUrl = await uploadSingleFile(image);

      const newItem = new DoctorModel({ ...req.body, image: imageUrl });
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
      const items = await DoctorModel.find({}).sort({ nmc: 1 });
      return res.status(200).json({ success: true, msg: "Get success", data: items });
    } catch (error: any) {
      return res.status(500).json({
        msg: "Something went wrong",
        success: false,
        error: error.message,
      });
    }
  })
// comments added
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const item = await DoctorModel.findById(req.params.id);
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

  // .patch("/:id",authenticateToken, upload.single("image"), async (req, res) => {
  //   try {
  //     const item = await DoctorModel.findById(req.params.id);
  //     if (!item) {
  //       return res.status(404).json({ success: false, msg: "Item not found" });
  //     }

  //     const previousImageUrl = item.image;
  //     const publicId = previousImageUrl.split("/").slice(-2).join("/").split(".")[0];

  //     let previousImageDeleted;
  //     try {
  //       previousImageDeleted = await cloudinary.uploader.destroy(publicId);
  //     } catch (error) {
  //       return res.status(500).json({
  //         success: false,
  //         msg: "Something went wrong while deleting previous image from Cloudinary",
  //       });
  //     }

  //     const imageUrl = await uploadSingleFile(req.file);

  //     const updatedItem = await DoctorModel.findByIdAndUpdate(req.params.id, { ...req.body, image: imageUrl }, { new: true });
  //     res.status(200).json({
  //       msg: "Update success",
  //       success: true,
  //       previous_file_delete: previousImageDeleted.result,
  //       current_file_upload: imageUrl && "ok",
  //       data: updatedItem,
  //     });
  //   } catch (error) {
  //     if (error instanceof multer.MulterError) {
  //       // Handle Multer errors
  //       res.status(400).json({
  //         success: false,
  //         message: "Invalid file uploaded",
  //         error: error.message,
  //       });
  //     } else {
  //       return res.status(500).json({
  //         success: false,
  //         msg: "Something went wrong",
  //       });
  //     }
  //   }
  // })

  .patch("/:id", authenticateToken, upload.single("image"), async (req, res) => {
    try {
      const item = await DoctorModel.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, msg: "Item not found" });
      }

      let imageUrl;

      // Check if a new image is provided
      if (req.file) {
        // Delete previous image
        const publicId = item.image.split("/").slice(-2).join("/").split(".")[0];
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          return res.status(500).json({
            success: false,
            msg: "Something went wrong while deleting previous image from Cloudinary",
          });
        }

        // Upload new image
        imageUrl = await uploadSingleFile(req.file);
      } else {
        // If no new image is provided, keep the previous image
        imageUrl = item.image;
      }

      const updatedItem = await DoctorModel.findByIdAndUpdate(req.params.id, { ...req.body, image: imageUrl }, { new: true });

      res.status(200).json({
        msg: "Update success",
        success: true,
        data: updatedItem,
      });
    } catch (error) {
      if (error instanceof multer.MulterError) {
        // Handle Multer errors
        res.status(400).json({
          success: false,
          message: "Invalid file uploaded",
          error: error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          msg: "Something went wrong",
        });
      }
    }
  })

  .delete("/:id", authenticateToken, async (req, res) => {
    try {
      const item = await DoctorModel.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, msg: "Item not found" });
      }

      const imageUrl = item.image;
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

      await DoctorDepartmentModel.deleteMany({ doctor: req.params.id });
      const deletedItem = await DoctorModel.findByIdAndDelete(req.params.id);
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
