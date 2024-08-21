const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, maxLength: 255 },
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/round-grey-moon-chair-with-brown-pillow-on-top-JaXs8Tk5Iww",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/round-grey-moon-chair-with-brown-pillow-on-top-JaXs8Tk5Iww"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
