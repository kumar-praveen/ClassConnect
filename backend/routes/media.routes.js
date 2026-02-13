import express from "express";
import { singleUpload } from "../middleware/multer.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

router.route("/upload-video").post(singleUpload, async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({
        success: false,
        message: "File not found",
      });
    }
    const fileUri = getDataUri(file);
    const result = await cloudinary.uploader.upload(fileUri, {
      resource_type: "auto",
      folder: "LMS"
    });

    res.status(200).json({
      success: true,
      message: "File Uploaded Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to upload video",
    });
  }
});

export default router;
