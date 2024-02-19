import { Router, Request, Response } from "express";
import HealthPackageModel from "../database/schema/healthPackage.schema";
import { authenticateToken } from "../../middlewares/authenticateToken";
const controller = Router();

controller
  .post("/", authenticateToken, async (req: Request, res: Response) => {
    try {
      const newItem = new HealthPackageModel(req.body);
      const savedItem = await newItem.save();
      res.status(201).json({
        msg: "Create success",
        success: true,
        data: savedItem,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  })

  // .get("/", async (req: Request, res: Response) => {
  //   try {
  //     const items = await HealthPackageModel.find();
  //     return res.status(200).json({ success: true, msg: "Get success", data: items });
  //   } catch (error: any) {
  //     return res.status(500).json({
  //       msg: "Something went wrong",
  //       success: false,
  //       error: error.message,
  //     });
  //   }
  // })

  .get("/", async (req: Request, res: Response) => {
    try {
      const items = await HealthPackageModel.find().sort({ order: 1 });
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
      const item = await HealthPackageModel.findById(req.params.id);
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

  .patch("/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
      const item = await HealthPackageModel.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, msg: "Item not found" });
      }

      const updatedItem = await HealthPackageModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({
        msg: "Update success",
        success: true,
        data: updatedItem,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        msg: "Something went wrong",
      });
    }
  })

  .delete("/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
      const deletedItem = await HealthPackageModel.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ success: false, msg: "Item not found" });
      }

      return res.status(200).json({
        success: true,
        msg: "Deleted success",
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
