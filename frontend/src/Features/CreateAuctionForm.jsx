import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAuctionForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startingPrice: "",
    endTime: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);

    if (!form.title || !form.startingPrice || !form.endTime) {
      return alert("Please fill out all required fields.");
    }

    try {
      setIsLoading(true);

      // Simulate submission delay
      setTimeout(() => {
        alert("Auction created (simulated)!");
        navigate("/auctions"); // Simulate redirect
      }, 1000);
    } catch (error) {
      console.error("Error creating auction", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-xl mx-auto p-6 border rounded-lg shadow-md mt-10 bg-white'>
      <h2 className='text-2xl font-semibold mb-6 text-center text-blue-700'>
        Create a New Auction
      </h2>

      {isError && (
        <div className='text-red-500 mb-4'>
          Failed to create auction. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className='w-full border px-4 py-2 rounded-md'
            placeholder='Enter auction title'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            name='description'
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className='w-full border px-4 py-2 rounded-md'
            placeholder='Enter auction description'
            rows='4'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Starting Price
          </label>
          <input
            type='number'
            name='startingPrice'
            value={form.startingPrice}
            onChange={(e) =>
              setForm({ ...form, startingPrice: e.target.value })
            }
            className='w-full border px-4 py-2 rounded-md'
            placeholder='Enter starting price'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            End Time
          </label>
          <input
            type='datetime-local'
            name='endTime'
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            className='w-full border px-4 py-2 rounded-md'
            required
          />
        </div>

        <div className='flex justify-center items-center'>
          <button
            type='submit'
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Auction..." : "Create Auction"}
          </button>
        </div>
      </form>
    </div>
  );
}
