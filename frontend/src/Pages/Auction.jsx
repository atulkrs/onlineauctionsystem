import { useState } from "react";

export default function SimpleAuctionPage() {
  const [bidAmount, setBidAmount] = useState("");
  const currentBid = 100;

  const handleBid = (e) => {
    e.preventDefault();
    if (!bidAmount || bidAmount <= currentBid) {
      alert("Please enter a bid higher than the current bid.");
      return;
    }
    alert(`Bid of $${bidAmount} placed successfully!`);
    setBidAmount("");
  };

  return (
    <div className='min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start'>
      <div className='bg-white shadow-lg rounded-lg max-w-2xl w-full p-8'>
        <h1 className='text-3xl font-bold text-blue-600 mb-4'>
          Vintage Clock Auction
        </h1>
        <p className='text-gray-700 mb-6'>
          This antique wall clock is in excellent condition and over 80 years
          old. Add a unique touch to your home with this timeless piece.
        </p>

        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div>
            <span className='text-gray-500'>Current Bid</span>
            <div className='text-xl font-semibold text-gray-800'>
              ${currentBid}
            </div>
          </div>
          <div>
            <span className='text-gray-500'>Time Left</span>
            <div className='text-xl font-semibold text-gray-800'>2 days</div>
          </div>
        </div>

        <form
          onSubmit={handleBid}
          className='flex flex-col sm:flex-row items-center'
        >
          <input
            type='number'
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder='Enter your bid'
            className='w-full sm:w-2/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition'
          >
            Place Bid
          </button>
        </form>
      </div>
    </div>
  );
}
