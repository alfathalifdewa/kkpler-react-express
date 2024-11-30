import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    id_category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    nutrition: {
      calories: {
        type: Number,
        required: false,
      },
      protein: {
        type: String,
        required: false,
      },
      carbohydrates: {
        type: String,
        required: false,
      },
      fiber: {
        type: String,
        required: false,
      },
      vitaminC: {
        type: String,
        required: false,
      },
    },
    harvestDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
