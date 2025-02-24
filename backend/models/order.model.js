import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentMethod: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
