import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; 

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        console.log(response);
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchPosts();
  }, []);


  const handleCreatePost = async () => {
    try {
      await axios.post("http://localhost:4000/users", {
        name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
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
              <li>
                <Link href="/" className="hover:text-indigo-200">Home</Link>
              </li>
              <li>
                <Link href="/users" className="hover:text-indigo-200">Users</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-indigo-200">Products</Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-indigo-200">Orders</Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-indigo-200">Reviews</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Create a New User</h2>

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
            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              onClick={handleCreatePost}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-4 hover:bg-indigo-700 transition duration-200"
            >
              Create User
            </button>
          </div>
        </div>

        {/* Users List Section */}
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.user_id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold">{post.username}</h3>
              <p className="text-gray-600">{post.email}</p>
              <p className="text-gray-500">{post.created_at}</p>
              <p className="text-gray-400">{post.password}</p>
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
