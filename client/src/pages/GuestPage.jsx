import { useState } from "react";
import { updateRoom } from "../api/roomAPI";

export default function GuestPage() {
    const [selectedRoom, setSelectedRoom] = useState(1);
    const [housekeeping, setHousekeeping] = useState(null);

    // Function to handle updating the room's status
    const handleHousekeeping = async (status) => {
        try {
            // Call the updateRoom function from the API
            const updatedRoom = await updateRoom(selectedRoom, { status });

            // After successful API response, update the housekeeping status
            if (updatedRoom) {
                setHousekeeping(status);
            }
        } catch (error) {
            console.error('Error updating room:', error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Welcome, Dan!</h1>
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
                <p style={{ margin: "5px 0" }}>The status of your room is: <strong>Clean.</strong></p>
                <p style={{ margin: "5px 0" }}>It was last cleaned on 02/12/2025 at 9:15PM</p>
            </div>

            {/* Housekeeping Buttons */}
            <div style={{
                marginTop: "20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px"
            }}>
                <button onClick={() => handleHousekeeping("Requested")}>
                    Request Housekeeping
                </button>
                <button onClick={() => handleHousekeeping("Skipped")}>
                    No Housekeeping Today
                </button>
            </div>

            {/* Housekeeping Status */}
            {housekeeping && (
                <p style={{ marginTop: "15px" }}>
                    Housekeeping: {housekeeping === "Requested" ? "Requested ✅" : "Skipped ❌"}
                </p>
            )}
        </div>
    );
}
