import express from "express";
const CloudUpload = express.Router();
import fileUploader, { cloudinary } from "../configs/cloudinary.config.js";

CloudUpload.post("/", fileUploader.single("file"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.path });
});
//delete
CloudUpload.delete("/:publicId", async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);
    console.log(result);
    result &&
      res.status(200).json({
        success: true,
        message: result.result
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
export default CloudUpload;
