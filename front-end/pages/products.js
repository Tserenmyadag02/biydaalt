import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 h-full flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-6 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Nest-12</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-indigo-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/users" className="hover:text-indigo-200">
                  Users
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-indigo-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-indigo-200">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-indigo-200">
                  Reviews
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-6 mt-12">
        {/* Products List Section */}
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <p className="text-gray-500">{product.description}</p>
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
