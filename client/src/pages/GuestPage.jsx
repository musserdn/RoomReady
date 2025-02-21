import { useState, useEffect } from "react";
import { retrieveRoom, updateRoom } from "../api/roomAPI";
import AuthService from "../utils/auth";

export default function GuestPage() {
    const [selectedRoom, setSelectedRoom] = useState(1);
    const [roomStatus, setRoomStatus] = useState("Loading...");
    const [lastCleaned, setLastCleaned] = useState("...");
    const [housekeeping, setHousekeeping] = useState(null);


    const user = AuthService.getUserDetails();

    // Function to format timestamps
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    // Fetch room status when selectedRoom changes
    useEffect(() => {
        const fetchRoomStatus = async () => {
            try {
                const roomData = await retrieveRoom(selectedRoom);
                if (roomData) {
                    setRoomStatus(roomData.status);
                    setLastCleaned(formatTimestamp(roomData.updatedAt));
                }
            } catch (error) {
                console.error("Error fetching room:", error);
                setRoomStatus("Unavailable");
                setLastCleaned("N/A");
            }
        };

        fetchRoomStatus();
    }, [selectedRoom]);

    // Function to handle housekeeping requests
    const handleHousekeeping = async (status) => {
        try {
            const updatedRoom = await updateRoom(selectedRoom, { status });
            if (updatedRoom) {
                setRoomStatus(updatedRoom.status);
                setLastCleaned(formatTimestamp(updatedRoom.updatedAt));
                setHousekeeping(status);
            }
        } catch (error) {
            console.error("Error updating room:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Welcome, {user && user.name ? user.name : "Guest"}!</h1>
            <h2>Select your room:</h2>
            <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                {[...Array(12).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>
                        Room {num + 1}
                    </option>
                ))}
            </select>

            {/* Status Box */}
            <div style={{
                border: "2px solid black",
                padding: "15px",
                margin: "20px auto",
                width: "fit-content",
                borderRadius: "10px",
                backgroundColor: "#f8f8f8"
            }}>
                <p style={{ margin: "5px 0" }}>
                    The status of your room is: <strong>{roomStatus}</strong>
                </p>
                <p style={{ margin: "5px 0" }}>
                    Your room status was last updated on: {lastCleaned}
                </p>
            </div>

            {/* Housekeeping Buttons */}
            <div style={{
                marginTop: "20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px"
            }}>
                <button onClick={() => handleHousekeeping("Scheduled")}>
                    Request Housekeeping
                </button>
                <button onClick={() => handleHousekeeping("Skipped")}>
                    No Housekeeping Today
                </button>
            </div>

            {/* Housekeeping Status */}
            {housekeeping && (
                <p style={{ marginTop: "15px" }}>
                    Housekeeping: {housekeeping === "Scheduled" ? "Requested ✅" : "Skipped ❌"}
                </p>
            )}
        </div>
    );
}
