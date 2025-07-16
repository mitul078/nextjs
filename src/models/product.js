
import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    imgSRC: String
})


export const productModel =
    mongoose.models.product || mongoose.model("product", productSchema);

