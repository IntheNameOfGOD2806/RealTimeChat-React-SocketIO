import { message } from "antd";
import redis from "../libs/redis.js";
import Product from "../models/product.model.js";
import uploadCloud from "../configs/cloudinary.config.js";
import { cloudinary } from "../configs/cloudinary.config.js";
import multer from "multer";
import { extractPublicId } from "../libs/helper.js";
const upload = multer();
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category");
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const getFeaturedProducts = async (req, res) => {
  try {
    //redis
    let featuredProducts = await redis.get("featuredProducts");
    if (!featuredProducts) {
      featuredProducts = await Product.find({ isFeatured: true })
        .populate("category")
        .lean();
      if (!featuredProducts) {
        return res.status(404).json({
          success: false,
          error: "No featured products found",
        });
      }
      await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    } else {
      featuredProducts = JSON.parse(featuredProducts);
    }
    res.status(200).json({
      success: true,
      data: featuredProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const createProduct = async (req, res) => {
  try {
    let { name, description, price, category, stock, images, size, color } =
      req.body;

    if (!name || !description || !price || !images) {
      return res.status(400).json({
        success: false,
        error: "Vui lòng cung cấp đủ thông tin",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
      size,
      color,
    });
    await product.save();
    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Product ID is required",
      });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    } else {
      const imagePromises = product?.images?.map((imageUrl) => {
        const res = cloudinary.uploader.destroy(extractPublicId(imageUrl));
        console.log('res', res)
      });
      await Promise.all(imagePromises);
      // console.log("Product deleted successfully");
    }
    res.status(200).json({
      success: true,
      data: product,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
