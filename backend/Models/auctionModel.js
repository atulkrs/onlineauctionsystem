const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startingPrice: { type: Number, required: true, min: 0 },
    currentPrice: {
      type: Number,
      default: function () {
        return this.startingPrice;
      },
    },
    incrementAmount: { type: Number, default: 1 }, // Minimum bid increment
    imageUrl: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "upcoming", "active", "closed", "sold", "expired"], // pending: admin approval?
      default: "upcoming",
    },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
  },
  { timestamps: true }
);

AuctionSchema.index({ title: "text", description: "text" }); // For text search

module.exports = mongoose.model("Auction", AuctionSchema);
