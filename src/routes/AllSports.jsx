import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllSports = () => {
  const [sports, setSports] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // State for sort order (ascending or descending)

  useEffect(() => {
    fetch("https://equi-sports-server-swart.vercel.app/sports")
      .then((res) => res.json())
      .then((data) => setSports(data))
      .catch((err) => console.error(err));
  }, []);

  // Function to toggle the sort order and sort sports by price
  const handleSort = () => {
    const sortedSports = [...sports].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price; // Sort in ascending order
      } else {
        return b.price - a.price; // Sort in descending order
      }
    });
    setSports(sortedSports);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-5">All Sports Equipment</h1>
      <div className="mb-5">
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sports.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.itemName}</td>
                <td className="border px-4 py-2">{item.categoryName}</td>
                <td className="border px-4 py-2">${item.price}</td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    to={`/product-details/${item._id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSports;
