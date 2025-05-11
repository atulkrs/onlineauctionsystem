import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditAuctionForm() {
  const navigate = useNavigate();

  // Simulated auction data (this would usually come from an API)
  const [form, setForm] = useState({
    title: "Vintage Clock",
    description: "An antique wall clock in excellent condition.",
    endTime: new Date().toISOString().slice(0, 16), // default to now
  });

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);

    // Simulated "save" process
    setTimeout(() => {
      alert("Auction updated (simulated)!");
      setUpdating(false);
      navigate("/auctions"); // Simulate navigation after update
    }, 1000);
  };

  return (
    <div className='max-w-xl mx-auto p-6 border rounded-lg shadow-md mt-10 bg-white'>
      <h2 className='text-2xl font-semibold mb-6 text-center text-blue-700'>
        Edit Auction
      </h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className='w-full border px-4 py-2 rounded-md'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className='w-full border px-4 py-2 rounded-md'
            rows='4'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            End Time
          </label>
          <input
            type='datetime-local'
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            className='w-full border px-4 py-2 rounded-md'
            required
          />
        </div>

        <button
          type='submit'
          disabled={updating}
          className={`w-full bg-green-600 text-white py-2 rounded-md ${
            updating ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {updating ? "Updating..." : "Update Auction"}
        </button>
      </form>
    </div>
  );
}
