import mongoose from "mongoose";

const CoinSchema = new mongoose.Schema({
  _id: { type: Number, required: true },

  Name: { type: String },
  Country: { type: String },
  Series: { type: String },
  "Catalog Codes": { type: String },

  "Issued on": { type: Number },
  "Last issue date": { type: Number },
  "Distribution": { type: String },
  "Composition": { type: String },
  "EdgeVariety": { type: String },
  Orientation: { type: String },
  Shape: { type: String },
  Rim: { type: mongoose.Schema.Types.Mixed },
  "Variant Year": { type: Number },
  "Variant Mint Mark": { type: mongoose.Schema.Types.Mixed },
  "Variant Note": { type: String },
  "Variant": { type: mongoose.Schema.Types.Mixed },

  Weight: { type: Number },
  Width: { type: Number },
  Height: { type: mongoose.Schema.Types.Mixed },
  Thickness: { type: mongoose.Schema.Types.Mixed },

  "Ord Wc": { type: Number },
  Currency: { type: String },
  FaceValue: { type: String },
  "Known mintage": { type: mongoose.Schema.Types.Mixed },

  Score: { type: Number },
  Accuracy: { type: String },

  ZcoCoinMint: { type: String },
  Themes: { type: String },
  ItemInscription: { type: String },
  Description: { type: String },

  Link: { type: String },
  List: { type: mongoose.Schema.Types.Mixed },
  Quantity: { type: mongoose.Schema.Types.Mixed },
  Condition: { type: mongoose.Schema.Types.Mixed },
  "Public Note": { type: mongoose.Schema.Types.Mixed },
  "Private Note": { type: mongoose.Schema.Types.Mixed },
});

const Coin = mongoose.model("Coin", CoinSchema);

export default Coin;