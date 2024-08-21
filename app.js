const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working...");
});

// index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", async (req, res) => {
  res.render("./listings/new.ejs");
});

// show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// create route
app.post("/listings/", async (req, res) => {
  const newListing = new Listing(req.body.Listing);
  await newListing.save();
  res.redirect("/listings");
});

// testing route --
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//       title: "my new villa",
//       description: "By the beach",
//       price: 1200,
//       location: "Goa",
//       contry: "india",
//     });
//     await sampleListing.save();
//     console.log("sample listing was saved");
//     res.send("successfull testing");
//   });

app.listen("8080", () => {
  console.log("Server is listening to port 8080");
});
