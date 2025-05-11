import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [auctions, setAuctions] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const auctionsResponse = await fetch("/api/auctions");
        const auctionsData = await auctionsResponse.json();
        setAuctions(auctionsData);

        const usersResponse = await fetch("/api/users");
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteAuction = async (id) => {
    if (window.confirm("Are you sure you want to delete this auction?")) {
      try {
        setIsDeleting(true);
        await fetch(`/api/auctions/${id}`, {
          method: "DELETE",
        });
        setAuctions(auctions.filter((auction) => auction._id !== id));
      } catch (error) {
        console.error("Error deleting auction:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8'>
        <h1 className='text-3xl font-bold text-blue-600 mb-8'>
          Admin Dashboard
        </h1>

        {/* Auction Management */}
        <div className='mb-12'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Manage Auctions
          </h2>
          <Link
            to='/auctions/create'
            className='bg-green-600 text-white py-2 px-4 rounded-md mb-4 inline-block hover:bg-green-700'
          >
            Create New Auction
          </Link>
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto border-collapse'>
              <thead>
                <tr>
                  <th className='border-b p-4 text-left'>Title</th>
                  <th className='border-b p-4 text-left'>Current Bid</th>
                  <th className='border-b p-4 text-left'>End Time</th>
                  <th className='border-b p-4 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {auctions.map((auction) => (
                  <tr key={auction._id}>
                    <td className='border-b p-4'>{auction.title}</td>
                    <td className='border-b p-4'>${auction.currentBid}</td>
                    <td className='border-b p-4'>
                      {new Date(auction.endTime).toLocaleString()}
                    </td>
                    <td className='border-b p-4'>
                      <Link
                        to={`/auctions/edit/${auction._id}`}
                        className='text-blue-600 hover:text-blue-800 mr-4'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteAuction(auction._id)}
                        className='text-red-600 hover:text-red-800'
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Management */}
        <div>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Manage Users
          </h2>
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto border-collapse'>
              <thead>
                <tr>
                  <th className='border-b p-4 text-left'>Username</th>
                  <th className='border-b p-4 text-left'>Email</th>
                  <th className='border-b p-4 text-left'>Role</th>
                  <th className='border-b p-4 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className='border-b p-4'>{user.username}</td>
                    <td className='border-b p-4'>{user.email}</td>
                    <td className='border-b p-4'>{user.role}</td>
                    <td className='border-b p-4'>
                      <Link
                        to={`/users/edit/${user._id}`}
                        className='text-blue-600 hover:text-blue-800 mr-4'
                      >
                        Edit
                      </Link>
                      {/* Add any user management actions (e.g., change role, delete user) */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
