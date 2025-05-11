// backend/sockets/socketHandler.js
const Auction = require("../Models/auctionModel");
const Bid = require("../Models/bidModel");
const User = require("../Models/userModel"); // For populating bidder info
const jwt = require("jsonwebtoken");

let ioInstance;

const initSocket = (io) => {
  ioInstance = io;

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = await User.findById(decoded.id).select("-password");
        if (!socket.user) {
          return next(new Error("Authentication error: User not found"));
        }
        next();
      } catch (err) {
        return next(new Error("Authentication error: Token invalid"));
      }
    } else {
      console.log("Unauthenticated socket connection for listening");
      next();
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    if (socket.user) console.log("Authenticated user:", socket.user.username);

    socket.on("join_auction_room", (auctionId) => {
      socket.join(auctionId);
      console.log(`Socket ${socket.id} joined room ${auctionId}`);
    });

    socket.on("leave_auction_room", (auctionId) => {
      socket.leave(auctionId);
      console.log(`Socket ${socket.id} left room ${auctionId}`);
    });

    socket.on("place_bid", async ({ auctionId, amount }) => {
      if (!socket.user) {
        socket.emit("bid_error", { message: "You must be logged in to bid." });
        return;
      }
      if (!auctionId || !amount) {
        socket.emit("bid_error", {
          message: "Missing auction ID or bid amount.",
        });
        return;
      }

      try {
        const auction = await Auction.findById(auctionId);
        if (!auction) {
          socket.emit("bid_error", { message: "Auction not found." });
          return;
        }
        if (auction.status !== "active") {
          socket.emit("bid_error", { message: "Auction is not active." });
          return;
        }
        if (socket.user._id.equals(auction.seller)) {
          socket.emit("bid_error", {
            message: "You cannot bid on your own auction.",
          });
          return;
        }

        const bidAmount = Number(amount);
        const requiredMinBid =
          auction.currentPrice +
          (auction.bids.length > 0 ? auction.incrementAmount : 0);

        if (bidAmount < requiredMinBid) {
          socket.emit("bid_error", {
            message: `Bid must be at least $${requiredMinBid.toFixed(2)}`,
          });
          return;
        }

        const newBid = new Bid({
          auction: auctionId,
          bidder: socket.user._id,
          amount: bidAmount,
        });
        await newBid.save();

        auction.bids.push(newBid._id);
        auction.currentPrice = bidAmount;
        auction.winner = socket.user._id; // Tentative winner
        await auction.save();

        // Populate bidder info for broadcasting
        const populatedBid = await Bid.findById(newBid._id).populate(
          "bidder",
          "username"
        );

        // Broadcast to all clients in the auction room
        io.to(auctionId).emit("bid_update", {
          auctionId,
          bid: populatedBid,
          currentPrice: auction.currentPrice,
          winner: { _id: socket.user._id, username: socket.user.username },
        });
        socket.emit("bid_success", { message: "Bid placed successfully!" });
      } catch (error) {
        console.error("Bid placement error:", error);
        socket.emit("bid_error", { message: "Server error placing bid." });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

const getIoInstance = () => {
  if (!ioInstance) {
    throw new Error("Socket.IO not initialized!");
  }
  return ioInstance;
};

module.exports = { initSocket, getIoInstance };
