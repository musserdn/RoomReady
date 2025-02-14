import { useState } from "react";

export default function GuestPage() {
    const [selectedRoom, setSelectedRoom] = useState(1);
    const [housekeeping, setHousekeeping] = useState(null);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Welcome, Dan!</h1>
            <h2>Select your room:</h2>
            <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                {[...Array(10).keys()].map(num => (
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
            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setHousekeeping("Requested")} style={{ marginRight: "10px" }}>
                    Request Housekeeping
                </button>
                <button onClick={() => setHousekeeping("Skipped")}>
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