import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

// Contact component for sending messages and navigating to the Card component
const Contact = () => {
  const location = useLocation(); // Hook to get the current location and state passed via navigation
  const serviceDetails = location.state; // Extract service details from the location state

  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate(); // Hook to navigate programmatically
  console.log(serviceDetails);
  
  // Function to handle form submission
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const budget=serviceDetails.totalBudget;
    const location=serviceDetails.location.location;
    const eventname=serviceDetails.serviceTitle;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        {
          name,
          email,
          subject,
          eventname,
          address,
          message,
          budget,
          location,

        },
        {
          withCredentials: true, // Include credentials if required
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      );

      // Display success notification
      toast.success(response.data.message);
      // Simulate form submission and navigate to the Card component with event data
      const event = serviceDetails.serviceTitle; // Extract event title
      const eventData =
        serviceDetails.serviceTitle === "Camping Trip Planning"
          ? {
              // Prepare data for Camping Trip Planning
              date: serviceDetails.eventDate,
              numberOfDays: serviceDetails.timings.numberOfDays,
              location: serviceDetails.location,
            }
          : serviceDetails.serviceTitle === "Wedding Planning"
          ? {
              // Prepare data for Wedding Planning
              timings: serviceDetails.timings,
              location: serviceDetails.location,
            }
          : {
              // Prepare data for other events
              startTime: serviceDetails.timings.startTime,
              endTime: serviceDetails.timings.endTime,
              location: serviceDetails.location,
            };

      // Navigate to the Card component with event details and form data
      navigate("/card", {
        state: {
          event,
          eventData,
          name,
        },
      });

      // Reset the form fields
      setName("");
      setEmail("");
      setMessage("");
      setAddress("");
      setSubject("");
    } catch (error) {
      // Handle errors and display a toast notification
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="contact container">
        {/* Contact information section */}
        <div className="banner">
          <div className="item">
            <h4>Address</h4>
            <p>Anywhere, Any City, 4521</p>
          </div>
          <div className="item">
            <h4>Call Us</h4>
            <p>Call Us: +92-321-1111111</p>
          </div>
          <div className="item">
            <h4>Mail Us</h4>
            <p>zk@gmail.com</p>
          </div>
        </div>

        {/* Contact form and map section */}
        <div className="banner">
          <div className="item">
            {/* Embedded Google Map */}
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  className="gmap_iframe"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Graphic Era University, Dehradun, India&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  title="Google Map"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="item">
            {/* Contact form */}
            <form onSubmit={handleSendMessage}>
              <h2>CONTACT</h2>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Update name state
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)} // Update subject state
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)} // Update address state
              />
              <textarea
                rows={10}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Update message state
              />
              <button type="submit">Send</button> {/* Submit form */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
