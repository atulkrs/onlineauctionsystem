import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAuctionButton({ auctionId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this auction?"))
      return;

    setIsError(false);
    setIsLoading(true);

    // Simulate deletion delay
    setTimeout(() => {
      const success = true; // Change to false to simulate error

      if (success) {
        alert(`Auction ${auctionId} deleted (simulated).`);
        navigate("/auctions"); // Redirect after simulated deletion
      } else {
        console.error("Simulated delete error");
        setIsError(true);
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className='mt-4'>
      {isError && (
        <div className='text-red-500 mb-4'>
          Failed to delete auction. Please try again.
        </div>
      )}

      <button
        onClick={handleDelete}
        className={`bg-red-600 text-white py-2 px-4 rounded-md transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete Auction"}
      </button>
    </div>
  );
}
