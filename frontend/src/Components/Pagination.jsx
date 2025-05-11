import { useCreateAuctionMutation } from '../features/auction/auctionApi';
import { useState } from 'react';

export default function CreateAuctionForm() {
  const [form, setForm] = useState({ title: '', description: '', startingPrice: '', endTime: '' });
  const [createAuction, { isLoading }] = useCreateAuctionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAuction(form);
    setForm({ title: '', description: '', startingPrice: '', endTime: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Starting Price"
        value={form.startingPrice}
        onChange={(e) => setForm({ ...form, startingPrice: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="datetime-local"
        value={form.endTime}
        onChange={(e) => setForm({ ...form, endTime: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Auction'}
      </button>
    </form>
  );
}
