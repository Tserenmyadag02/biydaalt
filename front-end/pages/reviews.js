import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/reviews");
        console.log('Reviews fetched:', response.data); // Add this line to log the response
        setReviews(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err); // Log the error for debugging
        setError(err.response?.data?.error || "An error occurred while fetching reviews.");
      }
    };

    fetchReviews();
  }, []);

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

      <div className="container mx-auto p-6 mt-32">
        {/* Reviews List Section */}
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {/* Display error if any */}
        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-6">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.review_id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold">{review.product_name}</h3>
                <p className="text-gray-600">{review.review_text}</p>
                <p className="text-gray-500">Rating: {review.rating}</p>
                <p className="text-gray-400">{review.created_at}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-96 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
