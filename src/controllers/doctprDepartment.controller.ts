import { Router, Request, Response } from "express";
import DoctorDepartmentModel from "../database/schema/doctorDepartment.schema";
import { authenticateToken } from "../../middlewares/authenticateToken";
const controller = Router();

controller

  .post("/", authenticateToken, async (req: Request, res: Response) => {
    try {
      const existingItem = await DoctorDepartmentModel.findOne({
        department: req.body.department,
        doctor: req.body.doctor,
      });

      if (existingItem) {
        return res.status(400).json({
          success: false,
          message: "Doctor already exists in this department",
        });
      }

      // If the document does not exist, create a new one
      const newItem = new DoctorDepartmentModel(req.body);
      const savedItem = await newItem.save();
      res.status(201).json({
        msg: "Doctor added in department",
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

  .get("/", async (req: Request, res: Response) => {
    try {
      const items = await DoctorDepartmentModel.find()
        .populate({
          path: "doctor",
          select: "name image position",
        })
        .populate({
          path: "department",
          select: "name",
        });

      return res.status(200).json({ success: true, msg: "Get success", data: items });
    } catch (error: any) {
      return res.status(500).json({
        msg: "Something went wrong",
        success: false,
        error: error.message,
      });
    }
  })

  .get("/doctors-by-department/:id", async (req: Request, res: Response) => {
    try {
      const departmentId = req.params.id;
      const items = await DoctorDepartmentModel.find({ department: departmentId }).populate({
        path: "doctor",
        select: "name image position department nmc",
      });

      return res.status(200).json({ success: true, msg: "Get success", data: items });
    } catch (error: any) {
      return res.status(500).json({
        msg: "Something went wrong",
        success: false,
        error: error.message,
      });
    }
  })

  // .get("/doctors-by-doctorId/:id", async (req: Request, res: Response) => {
  //   try {
  //     const doctorId = req.params.id;
  //     const items = await DoctorDepartmentModel.find({ doctor: doctorId }).populate({
  //       path: "doctor",
  //       select: "name image position",
  //     });

  //     return res.status(200).json({ success: true, msg: "Get success", data: items });
  //   } catch (error: any) {
  //     return res.status(500).json({
  //       msg: "Something went wrong",
  //       success: false,
  //       error: error.message,
  //     });
  //   }
  // })

  .get("/:id", async (req: Request, res: Response) => {
    try {
      const item = await DoctorDepartmentModel.findById(req.params.id);
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

  .delete("/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
      const deletedItem = await DoctorDepartmentModel.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ success: false, msg: "Item not found" });
      }

      return res.status(200).json({
        success: true,
        msg: "Doctor removed from  department",
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
