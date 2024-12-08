import { Helmet } from "react-helmet";

export default function NotFound() {
    return (
      <div className="text-center mt-20">
        <Helmet>
        <title>Error</title>
      </Helmet>
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-xl mt-4">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/" className="text-blue-500 underline mt-4">
          Go Back to Home
        </a>
      </div>
    );
  }
  