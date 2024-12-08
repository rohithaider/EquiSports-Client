import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ServiceCards({ item }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src={item.image}
          alt={item.serviceName}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{item.serviceName}</h2>
        <p className="text-sm text-gray-500">
          Category: <span className="font-medium">{item.category}</span>
        </p>
        <p className="text-sm text-gray-500">
          Pricing: <span className="font-medium">{item.pricing}</span>
        </p>
        <p className="text-sm text-gray-500">
          Counselor: <span className="font-medium">{item.counselor}</span>
        </p>
        <div className="card-actions justify-end mt-4">
          <Link to={`/service-details/${item.id}`} className="btn btn-primary">Learn More</Link>
        </div>
      </div>
    </div>
  );
}
