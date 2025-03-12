import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    stock: { type: Number, default: 0 },
    images: [{ type: String, required: [true, "Vui lòng cung cấp hình ảnh"] }], // Danh sách URL hình ảnh
    size: [{ type: String }], // Các size có sẵn
    color: [{ type: String }], // Các màu có sẵn
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
