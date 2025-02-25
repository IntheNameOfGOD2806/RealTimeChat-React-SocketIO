
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }], // Danh sách URL hình ảnh
    size: [{ type: String }], // Các size có sẵn
    color: [{ type: String }], // Các màu có sẵn
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Product = mongoose.model('Product', productSchema);
  export default Product;