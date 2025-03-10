const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://vanshika:mini123@cluster0.h8cjb.mongodb.net/indoart')
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

const paintingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    price: {
        original: { type: Number, required: true },
        discounted: { type: Number, required: true }
    },
    image: { type: String, required: true }, // Path to image or URL
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    discount: { type: Number, required: true },
    isFlashSale: { type: Boolean, required: true },
});
const artworks = mongoose.model('artists', paintingSchema);

module.exports = artworks;
