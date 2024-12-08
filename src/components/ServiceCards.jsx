import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ServiceCards({ item }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl border ">
      <figure>
        <img
          src={item.image}
          alt={item.serviceName}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{item.itemName}</h2>
        <p className="text-sm text-gray-500">
          Category: <span className="font-medium">{item.categoryName}</span>
        </p>
        <p className="text-sm text-gray-500">
          Pricing: <span className="font-medium">${item.price}</span>
        </p>
        <p className="text-sm text-gray-500">
          Rating: <span className="font-medium">{item.rating}</span>
        </p>
        <div className="card-actions justify-end mt-4">
          <Link to={`/service-details/${item._id}`} className="btn btn-primary">Learn More</Link>
        </div>
      </div>
    </div>
  );
}
