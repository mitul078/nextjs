
import mongoose from "mongoose"

const thumbnailSchema = new mongoose.Schema({
    name: String,
    description: String,
    imgSRC: String , 
    rating: Number,
})


export const thumbnailModel =
    mongoose.models.productThumbnail || mongoose.model("productThumbnail", thumbnailSchema);

