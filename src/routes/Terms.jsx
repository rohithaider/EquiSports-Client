
const Terms = () => {
  return (
    <div className="p-6 bg-gray-100 text-gray-800 w-11/12 mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to our platform! By accessing or using our services, you agree to abide by the following terms and conditions. Please read them carefully.
      </p>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">General Terms</h2>
        <ul className="list-disc list-inside">
          <li>
            All services are subject to availability and may change without prior notice.
          </li>
          <li>
            The content and materials provided during the sessions are for personal use only and cannot be redistributed without permission.
          </li>
          <li>
            Payments for services are non-refundable except in cases where the service cannot be delivered as promised.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Service-Specific Terms</h2>
        <p className="mb-4">
          Each service has unique guidelines, including pricing, duration, and counselor details. Below are highlights for our offerings:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <strong>Career Counseling Sessions:</strong> Personalized career guidance provided by Dr. Sarah Johnson. Scheduled for 05-12-24, 5-6 PM.
          </li>
          <li>
            <strong>Resume Review:</strong> A professional review tailored to your industry by Mr. John Smith. Scheduled for 06-12-24, 2-3 PM.
          </li>
          <li>
            <strong>Mock Interviews:</strong> Realistic practice sessions with Ms. Emily Davis. Scheduled for 07-12-24, 3-5 PM.
          </li>
          <li>
            <strong>Public Speaking Workshop:</strong> Hands-on training with Mr. Andrew Lee. Scheduled for 08-12-24, 10 AM-12 PM.
          </li>
          <li>
            <strong>Time Management Coaching:</strong> Productivity techniques with Dr. Rebecca Brown. Scheduled for 09-12-24, 1-2 PM.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Responsibilities</h2>
        <ul className="list-disc list-inside">
          <li>
            Users must ensure they meet the technical requirements for online services (e.g., a stable internet connection).
          </li>
          <li>
            Participation in group activities requires respecting other participants and the session leader.
          </li>
          <li>
            Any misuse of our services or resources may result in termination without a refund.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
        <p>
          We are not responsible for any outcomes resulting from the use of our services. The user accepts all risks associated with the application of the knowledge and guidance provided.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about these terms, please contact us at{" "}
          <a href="mailto:support@example.com" className="text-blue-500 underline">
            support@skillsphere.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default Terms;
