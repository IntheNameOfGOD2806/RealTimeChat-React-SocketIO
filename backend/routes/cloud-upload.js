import express from 'express';
const router = express.Router();
import fileUploader from '../configs/cloudinary.config.js';

router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
 
  res.json({ secure_url: req.file.path });
});

export default router;
