import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllSports = () => {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sports") // Update the URL if hosted on a different port
      .then((res) => res.json())
      .then((data) => setSports(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-5">All Sports Equipment</h1>
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
