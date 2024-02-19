import { Router, Request, Response } from "express";
import AdminModel from "../database/schema/admin.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../../middlewares/authenticateToken";
const controller = Router();

controller
  .post("/register", async (req: Request, res: Response) => {
    try {
      const admin = await AdminModel.findOne({ email: req.body.email });
      if (admin) {
        res.status(409).json({
          error: true,
          message: "Admin already exist with this Email",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const admin = new AdminModel({
          email: req.body.email,
          password: hashedPassword,
        });

        await admin.save();
        res.status(201).json({ msg: "Create success", success: true });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  })

  .post("/login", async (req: Request, res: Response) => {
    try {
      const admin = await AdminModel.findOne({ email: req.body.email });
      if (admin) {
        const verifiedPassword = await bcrypt.compare(req.body.password, admin.password);

        if (verifiedPassword) {
          const accessToken = jwt.sign({ id: admin._id }, "envSecretKey", { expiresIn: "1d" });
          res.status(200).json({
            msg: "Login success",
            success: true,
            accessToken: accessToken,
          });
        } else {
          return res.status(401).json({ error: true, message: "Invalid Credentials" });
        }
      } else {
        return res.status(401).json({ error: true, message: "Admin does not Exist" });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  })

  .get("/is-token-valid/:token", async (req: Request) => {
    try {
      jwt.verify(req.params.token, "envSecretKey");
      return true;
    } catch (error: any) {
      return false;
    }
  })

  .get("/", async (req: Request, res: Response) => {
    try {
      const items = await AdminModel.find();
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
      const item = await AdminModel.findById(req.params.id);
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

  .patch("/:id",authenticateToken, async (req: Request, res: Response) => {
    try {
      const item = await AdminModel.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, msg: "Item not found" });
      }

      const updatedItem = await AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

  .delete("/:id",authenticateToken, async (req: Request, res: Response) => {
    try {
      const deletedItem = await AdminModel.findByIdAndDelete(req.params.id);
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
