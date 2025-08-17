import { useLocation, useNavigate } from "react-router-dom";

const Card = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { event, eventData, name } = location.state || {};

  if (!event || !eventData || !name) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>No Data Found</h1>
        <button style={styles.button} onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.ribbon}>Event Details</div>
        <div style={styles.cardContent}>
          <h2 style={styles.subtitle}> You Are Invited To {name}'s {event}</h2>
          {event === "Camping Trip Planning" ? (
            <>
              <p><strong>Date:</strong> {new Date(eventData.date).toLocaleDateString()}</p>
              <p><strong>Number of Days:</strong> {eventData.numberOfDays}</p>
              <p><strong>Location:</strong> {eventData.location.location}</p>
            </>
          ) : event === "Wedding Planning" ? (
            <>
              <label style={styles.label}>Timings:</label>
              <p><strong>Reception:</strong> {eventData.timings.reception}</p>
              <p><strong>Dinner:</strong> {eventData.timings.dinner}</p>
              <p><strong>Other:</strong> {eventData.timings.other}</p>
              <p><strong>Location:</strong> {eventData.location.location}</p>
            </>
          ) : (
            <>
              <p><strong>Start Time:</strong> {eventData.startTime}</p>
              <p><strong>End Time:</strong> {eventData.endTime}</p>
              <p><strong>Location:</strong> {eventData.location.location}</p>
            </>
          )}
          <button style={styles.button} onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)",
    padding: "1rem",
  },
  card: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    maxWidth: "500px",
    width: "100%",
    padding: "2rem",
    textAlign: "center",
    opacity: 0,
    animation: "fadeIn 1s forwards",  // Fade-in effect for the card
  },
  ribbon: {
    position: "absolute",
    top: "10px",
    left: "-12px",
    backgroundColor: "#FF6F61",
    color: "#fff",
    padding: "0.5rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    transform: "rotate(-25deg)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    animation: "slideIn 1s ease-out",  // Slide-in effect for the ribbon
  },
  cardContent: {
    marginTop: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#FF6F61",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#6A0572",
    fontWeight: "600",
  },
  label: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "#333",
  },
  details: {
    textAlign: "left",
    lineHeight: "1.8",
    fontSize: "1rem",
    color: "#555",
    marginBottom: "1.5rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#6A0572",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },
};

// Adding keyframe animations for card and ribbon
const keyframes = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes slideIn {
    0% {
      left: -20px;
      opacity: 0;
    }
    100% {
      left: -12px;
      opacity: 1;
    }
  }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${keyframes}</style>`);

export default Card;
