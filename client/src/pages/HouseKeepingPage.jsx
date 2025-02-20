import { useState, useEffect } from "react";
import { retrieveRooms, updateRoom } from "../api/roomAPI.js";
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
        return "#556F44"; // Fern Green
      case "Scheduled":
        return "#551B14"; // Caput Mortuum
      case "In Progress":
        return "#D19C1D"; // Goldenrod
      default:
        return "#8693AB"; // Cool Gray
    }
  };

  // Function that cycles the status
  const cycleStatus = (currentStatus) => {
    if (currentStatus === "Clean") return "Scheduled";
    if (currentStatus === "Scheduled") return "In Progress";
    // If status is "In Progress" or anything else (e.g., "Skip Today")
    return "Clean";
  };

  // Click handler that cycles the status and updates the room
  const handleClick = async (room) => {
    const newStatus = cycleStatus(room.status);
    try {
      // Call the updateRoom function from your API
      // We assume room.room is your unique room number key
      await updateRoom(room.room, { status: newStatus });
      // Update the local state by mapping over rooms and replacing the updated room
      setRooms((prevRooms) =>
        prevRooms.map((r) =>
          r.room === room.room ? { ...r, status: newStatus } : r
        )
      );
    } catch (error) {
      console.error("Error updating room:", error);
    }
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