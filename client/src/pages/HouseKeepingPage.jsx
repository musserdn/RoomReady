import { useState, useEffect } from "react";
import { retrieveRooms } from "../api/roomAPI.js";
import "/src/index.css";

export default function HouseKeepingPage() {
  const [rooms, setRooms] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch room data when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await retrieveRooms();
        if (data.length === 0) {
          setErrorMsg("Ope, there are no rooms.");
        }
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setErrorMsg("There was an error fetching rooms.");
      }
    };
    fetchRooms();
  }, []);

  // Map room status to a color
  const getColorForStatus = (status) => {
    switch (status) {
      case "Clean":
        return "#556F44"; //Fern Green
      case "Scheduled":
        return "#551B14"; // Caput Mortuum
      case "In Progress":
        return "#D19C1D"; // Goldenrod
      default:
        return "#8693AB"; // Cool Gray
    }
  };

  // Example click handler for each button
  const handleClick = (room) => {
    console.log("Clicked room:", room);
    // Additional logic or navigation here if needed
  };

  return (
    <div className="housekeeping-grid">
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      {rooms.map((room) => (
        <button
          key={room.room}
          className="housekeeping-button"
          onClick={() => handleClick(room)}
          style={{ backgroundColor: getColorForStatus(room.status) }}
        >
          Room {room.room}
        </button>
      ))}
    </div>
  );
}