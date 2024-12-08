import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { serviceId } = useParams();
  console.log(serviceId)
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/sports/${serviceId}`) // Ensure backend has a route to fetch by ID
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [serviceId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-5">Equipment Details</h1>
      <div className="flex justify-center">
        <div className="card w-full md:w-2/3 lg:w-1/2 bg-white shadow-lg rounded-lg p-5">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg mx-auto mb-5"
          />
          <h2 className="text-2xl font-semibold mb-2">{product.itemName}</h2>
          <p className="text-gray-700 mb-2">Category: {product.categoryName}</p>
          <p className="text-gray-700 mb-2">Price: ${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
