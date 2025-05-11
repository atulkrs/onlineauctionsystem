import { Link } from "react-router-dom";

export default function AuctionCard({ auction }) {
  return (
    <div className='bg-white shadow-md rounded p-4'>
      <img
        src={auction.image || "/default.jpg"}
        alt={auction.title}
        className='w-full h-40 object-cover rounded mb-4'
      />
      <h2 className='text-lg font-semibold'>{auction.title}</h2>
      <p className='text-gray-600 mb-2'>
        Current Bid: ₹{auction.currentBid || auction.startPrice}
      </p>
      <p className='text-sm text-gray-500 mb-2'>
        Ends in: {getRemainingTime(auction.endTime)}
      </p>
      <p className='text-sm text-gray-500 mb-4'>
        Total Bids: {auction.bids.length}
      </p>
      <Link
        to={`/auction/${auction._id}`}
        className='text-blue-600 font-medium hover:underline'
      >
        View Details
      </Link>
    </div>
  );
}

function getRemainingTime(endTime) {
  const diff = new Date(endTime) - new Date();
  if (diff <= 0) return "Auction ended";
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ${mins % 60}m`;
}
