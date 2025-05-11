import { useState, useEffect } from "react";
import AuctionCard from "../Components/AuctionCard";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [auctions, setAuctions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuctions = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `http://localhost:5000/api/auctions?page=${page}&search=${search}&sort=${sort}`
        );
        const data = await res.json();

        setAuctions(data.auctions);
        setHasMore(data.hasMore);
      } catch (err) {
        setError("Failed to load auctions.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [page, search, sort]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      <h1 className='text-3xl font-bold text-center mb-6'>
        Live & Upcoming Auctions
      </h1>

      {/* Search and Sort Controls */}
      <div className='flex flex-wrap justify-between items-center mb-6'>
        <input
          type='text'
          placeholder='Search auctions...'
          value={search}
          onChange={handleSearchChange}
          className='border p-2 w-full md:w-1/3 rounded shadow-sm'
        />

        <select
          value={sort}
          onChange={handleSortChange}
          className='border p-2 rounded shadow-sm mt-4 md:mt-0'
        >
          <option value='latest'>Latest</option>
          <option value='highestBid'>Highest Bid</option>
          <option value='endingSoon'>Ending Soon</option>
        </select>
      </div>

      {/* Auction Cards */}
      {loading ? (
        <p className='text-center'>Loading auctions...</p>
      ) : error ? (
        <p className='text-center text-red-600'>{error}</p>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {auctions.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>

          {/* Pagination */}
          <div className='flex justify-center mt-8 space-x-4'>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
            >
              Prev
            </button>
            <span className='px-4 py-2'>Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
