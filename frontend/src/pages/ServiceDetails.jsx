import "./ServiceDetails.css";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ServiceDetails = () => {
  const { state: service } = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const[location,setLocation]=useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1); // For Camping Trip
  const [ceremonyTimings, setCeremonyTimings] = useState({
    reception: "",
    dinner: "",
    other: "",
  });

  const handleOptionChange = (option, cost) => {
    const isChecked = selectedOptions.includes(option);
    if (isChecked) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
      setTotalBudget(totalBudget - cost);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      setTotalBudget(totalBudget + cost);
    }
  };

  const handleTimingChange = (ceremony, time) => {
    setCeremonyTimings({ ...ceremonyTimings, [ceremony]: time });
  };
  const handleLocationChange = (e)=>{
    setLocation(e.target.value)
  };

  const handleProceed = () => {
    // Prepare data to send to Contact page
    const serviceDetails = {
      serviceTitle: service.title,
      eventDate: selectedDate,
      selectedOptions,
      totalBudget,
      timings:
      service.title === "Wedding Planning"
        ? ceremonyTimings
        : service.title === "Camping Trip Planning"
        ? { numberOfDays }
        : { startTime, endTime },
        location:{location},
  };

    // Redirect to Contact page with data
    navigate("/", { state: serviceDetails });
  };

  return (
    <div className="service-details container">
      <h1>{service.title}</h1>

      {/* Calendar for Date Selection */}
      <h2>Select Event Date</h2>
      <Calendar
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />

      {/* Options for Budget Calculation */}
      <h2>Available Options</h2>
      <ul>
        {Object.entries(service.events || {}).map(([option, cost]) => (
          <li key={option}>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option, cost)}
              />
              {option} - ₹{cost}
            </label>
          </li>
        ))}
      </ul>

      {/* Total Budget */}
      <h3>Total Budget: ₹{totalBudget}</h3>

      {/* Ceremony Timings or Number of Days */}
      {service.title === "Wedding Planning" ? (
        <>
          <h2>Ceremony Timings</h2>
          <div className="timings">
            <div>
            <label>Location:</label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => handleLocationChange(e)}
              />
              <label>Reception:</label>
              <input
                type="text"
                placeholder="Enter reception time"
                value={ceremonyTimings.reception}
                onChange={(e) => handleTimingChange("reception", e.target.value)}
              />
              
            </div>
            <div>
              <label>Dinner:</label>
              <input
                type="text"
                placeholder="Enter dinner time"
                value={ceremonyTimings.dinner}
                onChange={(e) => handleTimingChange("dinner", e.target.value)}
              />
            </div>
            <div>
              <label>DJ:</label>
              <input
                type="text"
                placeholder="Enter timings for DJ"
                value={ceremonyTimings.other}
                onChange={(e) => handleTimingChange("other", e.target.value)}
              />
            </div>
          </div>
          <h3>
            Selected Timings: Reception - {ceremonyTimings.reception || "Not Set"}, Dinner -{" "}
            {ceremonyTimings.dinner || "Not Set"}, Other -{" "}
            {ceremonyTimings.other || "Not Set"}
          </h3>
        </>
      ) : service.title === "Camping Trip Planning" ? (
        <>
          <h2>Camping Details</h2>
          <div className="timings">
            <div>
              <label>Number of Days:</label>
              <input
                type="number"
                min="1"
                placeholder="Enter number of days"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(Number(e.target.value))}
              />
            </div>
          </div>
          <h3>Number of Days: {numberOfDays || "Not Set"}</h3>
          <label>Location:</label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => handleLocationChange(e)}
              />
        </>
      ) : (
        <>
          {/* Default Start and End Time for other services */}
          <h2>Ceremony Timings</h2>
          <div className="timings">
            <div>
              <label>Start Time:</label>
              <input
                type="text"
                placeholder="Enter start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label>End Time:</label>
              <input
                type="text"
                placeholder="Enter end time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
              <label>Location:</label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => handleLocationChange(e)}
              />
          
            </div>
          </div>
          <h3>
            Selected Timings: {startTime || "Not Set"} - {endTime || "Not Set"}
          </h3>
        </>
      )}

      {/* Proceed Button */}
      <button onClick={handleProceed}>Back to Home</button>
    </div>
  );
};

export default ServiceDetails;
