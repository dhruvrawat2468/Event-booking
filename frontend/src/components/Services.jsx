// import React from "react";

// import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const handleClick = (service) => {
    navigate(`/service/${service.id}`, { state: service });
  };

  const services = [
    {
      id: 1,
      url: "/birthday.jpg",
      title: "Birthday Planning",
      events: {
        cake: 800,
        decoration: 500,
        DJ: 1500,
        Food: 2000,
        Photography: 500,
      },
    },
    {
      id: 2,
      url: "/anniversary.jpg",
      title: "Anniversary Planning",
      events: {
        decoration: 1000,
        Food: 3000,
        Music: 1200,
        Gifts: 800,
      },
    },
    {
      id: 3,
      url: "/camping.jpg",
      title: "Camping Trip Planning",
      events: {
        Tents: 2000,
        Bonfire: 1500,
        Food: 2500,
        Guide: 1800,
      },
    },
    {
      id: 4,
      url: "/gamenight.jpg",
      title: "Game Night Planning",
      events: {
        BoardGames: 500,
        Snacks: 800,
        Drinks: 1200,
        Prizes: 700,
      },
    },
    {
      id: 5,
      url: "/party.jpg",
      title: "Party Planning",
      events: {
        Venue: 3000,
        Decoration: 1500,
        Music: 2000,
        Catering: 4000,
      },
    },
    {
      id: 6,
      url: "/wedding.jpg",
      title: "Wedding Planning",
      events: {
        Venue: 50000,
        Decoration: 20000,
        Catering: 70000,
        Photography: 15000,
      },
    
    },
  ];

  return (
    <div className="services container">
      <h2>OUR SERVICES</h2>
      <div className="banner">
        {services.map((service) => (
          <div
            className="item"
            onClick={() => handleClick(service)}
            key={service.id}
          >
            <h3>{service.title}</h3>
            <img src={service.url} alt={service.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
