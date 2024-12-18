import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchUsers();
  }, []);

  // Handle new user creation
  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/users", {
        username: name,
        email,
        password,
      });

      setUsers((prevUsers) => [...prevUsers, response.data]);
      setName("");
      setEmail("");
      setPassword("");
      setError(null);
      setSuccessMessage("User created successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Error creating user");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Nest-12</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-indigo-200">Home</Link></li>
              <li><Link href="/users" className="hover:text-indigo-200">Users</Link></li>
              <li><Link href="/products" className="hover:text-indigo-200">Products</Link></li>
              <li><Link href="/orders" className="hover:text-indigo-200">Orders</Link></li>
              <li><Link href="/reviews" className="hover:text-indigo-200">Reviews</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Create User Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Create a New User</h2>

          {successMessage && (
            <div className="bg-green-500 text-white p-3 rounded-lg mb-4">{successMessage}</div>
          )}
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>
          )}

          <form onSubmit={handleCreateUser}>
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter username"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-4 hover:bg-indigo-700 transition duration-200"
              >
                Create User
              </button>
            </div>
          </form>
        </div>

        {/* Users List Section */}
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.user_id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500">{user.created_at}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-36 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
