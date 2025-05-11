import { useState, useEffect } from "react";

// Simulated auction data
const sampleAuctions = [
  {
    _id: "1",
    title: "Vintage Clock",
    description: "Antique clock from 1920s, still works perfectly.",
    startingPrice: 100,
    currentBid: 150,
    endTime: "2025-06-10T18:00:00Z",
  },
  {
    _id: "2",
    title: "Classic Painting",
    description: "Original oil painting by a known artist.",
    startingPrice: 500,
    currentBid: 750,
    endTime: "2025-06-12T12:00:00Z",
  },
  {
    _id: "3",
    title: "Old Camera",
    description: "Retro film camera, great for collectors.",
    startingPrice: 200,
    currentBid: 250,
    endTime: "2025-06-09T15:30:00Z",
  },
  // Add more mock data if needed
];

const PAGE_SIZE = 2;

export default function AuctionList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    const results = sampleAuctions.filter((auction) =>
      auction.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAuctions(results);
    setPage(1);
  }, [search]);

  const paginatedAuctions = filteredAuctions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredAuctions.length / PAGE_SIZE);

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Browse Auctions</h1>

      <input
        type='text'
        placeholder='Search auctions...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      <div className='grid gap-5'>
        {paginatedAuctions.length === 0 ? (
          <p className='text-gray-500'>No auctions found.</p>
        ) : (
          paginatedAuctions.map((auction) => (
            <div
              key={auction._id}
              className='border p-4 rounded-xl shadow hover:shadow-md transition-all bg-white'
            >
              <div className='flex justify-between items-start'>
                <h2 className='text-xl font-semibold text-blue-700'>
                  {auction.title}
                </h2>
                <span className='text-sm text-gray-500'>
                  Ends: {new Date(auction.endTime).toLocaleString()}
                </span>
              </div>
              <p className='mt-2 text-gray-700'>{auction.description}</p>
              <div className='mt-3 text-sm text-gray-600'>
                <strong>Starting:</strong> ₹{auction.startingPrice} <br />
                <strong>Current Bid:</strong> ₹{auction.currentBid}
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className='flex justify-center mt-8 space-x-2'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-200 ${
                p === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
