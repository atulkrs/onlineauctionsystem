// Example: Get Auctions
const getAuctions = async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};
  const statusFilter = req.query.status ? { status: req.query.status } : {};


  const sortOrder =
    req.query.sortBy === "price_asc"
      ? { currentPrice: 1 }
      : req.query.sortBy === "price_desc"
      ? { currentPrice: -1 }
      : req.query.sortBy === "endTime_asc"
      ? { endTime: 1 }
      : { createdAt: -1 }; // Default sort

  const count = await Auction.countDocuments({
    ...keyword,
    ...statusFilter,
    status: { $in: ["active", "upcoming"] },
  });
  const auctions = await Auction.find({
    ...keyword,
    ...statusFilter,
    status: { $in: ["active", "upcoming"] },
  })
    .populate("seller", "username email")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sortOrder);

  res.json({ auctions, page, pages: Math.ceil(count / pageSize) });
};
