import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { Helmet } from "react-helmet";

const ServiceDetails = () => {
  const { data,user } = useContext(AuthContext); // Assuming data is an array
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Convert serviceId to a number
  const serviceIdNumber = Number(serviceId);

  // Find the service from the data
  useEffect(() => {
    const selectedService = data.find(item => item.id === serviceIdNumber);
    setService(selectedService);
  }, [data, serviceIdNumber]); 

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment(""); // Clear the input after submission
    }
  };

  if (!service) return <div>Loading...</div>;

  return (
    <div className="w-5/12 mx-auto">
        <Helmet>
        <title>Details</title>
      </Helmet>
      <h2 className="text-xl font-bold">{service.serviceName}</h2>
      <img
        src={service.image}
        alt={service.serviceName}
        className="w-full h-48 object-cover mt-4"
      />
      <p className="text-lg mt-4">Service-name: {service.serviceName}</p>
      <p className="text-lg">Category: {service.category}</p>
      <p className="text-lg">Pricing: {service.pricing}</p>
      <p className="text-lg">Counselor: {service.counselor}</p>
      <p className="text-lg">Duration: {service.duration}</p>
      <p className="text-lg">Description: {service.description}</p>
      <p className="text-lg">Rating: {service.rating}</p>
      

      {/* Comments Section */}
      <div className="comments-section mt-8">
        <h3 className="font-semibold">Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="border-b py-2">{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to leave feedback!</p>
        )}

        {/* Comment Input and Button */}
        {user ? (
          <div className="mt-4">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Leave your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={handleCommentSubmit}
            >
              Comment/Feedback
            </button>
          </div>
        ) : (
          <p>Please log in to leave a comment.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
